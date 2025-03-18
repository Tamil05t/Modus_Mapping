from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from auth.jwt_handler import create_access_token
from auth.encryption import encrypt_data

router = APIRouter()

class UserRegistration(BaseModel):
    username: str
    password: str

@router.post("/register")
def register(user: UserRegistration):
    # Save user to database (dummy implementation)
    encrypted_password = encrypt_data(user.password)
    # Store user in database (not shown here)
    return {"message": "User registered successfully"}
