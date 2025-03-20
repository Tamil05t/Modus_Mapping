from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware  # Add this line
from pydantic import BaseModel
from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext
from typing import List
import sqlite3
import json

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from the frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Security settings
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# User model
class User(BaseModel):
    username: str
    password: str

# Crime model
class Crime(BaseModel):
    id: int
    type: str
    location: str
    description: str

# SQLite database setup
def init_db():
    conn = sqlite3.connect("local_crimes.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS crimes (
            id INTEGER PRIMARY KEY,
            type TEXT,
            location TEXT,
            description TEXT
        )
    """)
    conn.commit()
    conn.close()

# Initialize database
init_db()

# JWT token creation
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# JWT token decoding
def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.JWTError:
        return None

# Authentication endpoint
@app.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # Hardcoded user for demo purposes
    if form_data.username != "admin" or form_data.password != "admin":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    access_token = create_access_token(data={"sub": form_data.username})
    return {"access_token": access_token, "token_type": "bearer"}

# Secure endpoint example
@app.get("/crimes/", response_model=List[Crime])
def get_crimes(token: str = Depends(oauth2_scheme)):
    conn = sqlite3.connect("local_crimes.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM crimes")
    crimes = cursor.fetchall()
    conn.close()
    return [{"id": row[0], "type": row[1], "location": row[2], "description": row[3]} for row in crimes]

# Add crime endpoint
@app.post("/crimes/", response_model=Crime)
def add_crime(crime: Crime, token: str = Depends(oauth2_scheme)):
    conn = sqlite3.connect("local_crimes.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO crimes (id, type, location, description) VALUES (?, ?, ?, ?)",
                   (crime.id, crime.type, crime.location, crime.description))
    conn.commit()
    conn.close()
    return crime
