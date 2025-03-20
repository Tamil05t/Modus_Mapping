from fastapi import APIRouter, Depends, File, UploadFile
from pydantic import BaseModel
from typing import Optional
import sqlite3

router = APIRouter()

class CrimeWithImage(BaseModel):
    id: int
    type: str
    location: str
    description: str
    latitude: float
    longitude: float
    image_url: Optional[str] = None

@router.post("/add-crime-with-image/")
async def add_crime_with_image(crime: CrimeWithImage, file: UploadFile = File(None)):
    conn = sqlite3.connect("local_crimes.db")
    cursor = conn.cursor()

    # Save image to a folder (e.g., "uploads") and get the URL
    image_url = None
    if file:
        image_data = await file.read()
        with open(f"uploads/{file.filename}", "wb") as f:
            f.write(image_data)
        image_url = f"http://localhost:8000/uploads/{file.filename}"

    # Insert crime into database
    cursor.execute(
        "INSERT INTO crimes (id, type, location, description, latitude, longitude, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
        (crime.id, crime.type, crime.location, crime.description, crime.latitude, crime.longitude, image_url),
    )
    conn.commit()
    conn.close()

    return {"message": "Crime added successfully", "image_url": image_url}
