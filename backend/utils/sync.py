import sqlite3
from neo4j import GraphDatabase

# SQLite connection
sqlite_conn = sqlite3.connect("local_crimes.db")
sqlite_cursor = sqlite_conn.cursor()

# Neo4j connection
neo4j_driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "password"))

# Batch size for syncing
BATCH_SIZE = 100

# Sync from SQLite to Neo4j (batch processing)
def sync_to_neo4j_batch():
    sqlite_cursor.execute("SELECT * FROM crimes")
    crimes = sqlite_cursor.fetchall()
    
    with neo4j_driver.session() as session:
        for i in range(0, len(crimes), BATCH_SIZE):
            batch = crimes[i:i + BATCH_SIZE]
            session.run(
                """
                UNWIND $batch AS crime
                MERGE (c:Crime {id: crime.id})
                SET c.type = crime.type, 
                    c.location = crime.location, 
                    c.description = crime.description
                """,
                batch=[
                    {"id": crime[0], "type": crime[1], "location": crime[2], "description": crime[3]} 
                    for crime in batch
                ]
            )

# Sync from Neo4j to SQLite (batch processing)
def sync_to_sqlite_batch():
    with neo4j_driver.session() as session:
        result = session.run("MATCH (c:Crime) RETURN c.id, c.type, c.location, c.description")

        batch = []
        for record in result:
            batch.append((
                record["c.id"], 
                record["c.type"], 
                record["c.location"], 
                record["c.description"]
            ))

            # Insert in batches for efficiency
            if len(batch) >= BATCH_SIZE:
                sqlite_cursor.executemany(
                    """
                    INSERT OR REPLACE INTO crimes (id, type, location, description) 
                    VALUES (?, ?, ?, ?)
                    """, batch
                )
                batch = []

        # Insert remaining records
        if batch:
            sqlite_cursor.executemany(
                """
                INSERT OR REPLACE INTO crimes (id, type, location, description) 
                VALUES (?, ?, ?, ?)
                """, batch
            )

        sqlite_conn.commit()

# Two-way batch sync
def sync_data():
    print("Starting two-way batch sync...")
    sync_to_neo4j_batch()
    sync_to_sqlite_batch()
    print("Sync complete!")

# Close connections
def close_connections():
    sqlite_conn.close()
    neo4j_driver.close()

# Main execution
if __name__ == "__main__":
    try:
        sync_data()
    finally:
        close_connections()
