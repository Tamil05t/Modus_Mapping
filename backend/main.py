from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
from jose import jwt, JWTError
from passlib.context import CryptContext
from typing import List
from pydantic import BaseModel
import sqlite3

# ✅ Initialize FastAPI app
app = FastAPI()

# ✅ CORS settings (Vite frontend port)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # ✅ Match Vite port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Security Settings
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# ✅ Password hashing and OAuth2 scheme
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# ✅ Database initialization
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

# ✅ JWT token creation
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# ✅ JWT token verification
def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

# ✅ Crime model
class Crime(BaseModel):
    id: int
    type: str
    location: str
    description: str

# ✅ Initialize the database
init_db()

# ✅ Authentication endpoint
@app.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # Hardcoded admin credentials
    if form_data.username != "admin" or form_data.password != "admin":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": form_data.username})
    return {"access_token": access_token, "token_type": "bearer"}

# ✅ Get all crimes (protected by JWT)
@app.get("/crimes/", response_model=List[Crime])
def get_crimes(token: dict = Depends(verify_token)):
    conn = sqlite3.connect("local_crimes.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM crimes")
    crimes = cursor.fetchall()
    conn.close()

    return [{"id": row[0], "type": row[1], "location": row[2], "description": row[3]} for row in crimes]

# ✅ Add a new crime (protected by JWT)
@app.post("/crimes/", response_model=Crime)
def add_crime(crime: Crime, token: dict = Depends(verify_token)):
    conn = sqlite3.connect("local_crimes.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO crimes (id, type, location, description) VALUES (?, ?, ?, ?)",
                   (crime.id, crime.type, crime.location, crime.description))
    conn.commit()
    conn.close()
    return crime
