import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_crimes():
    response = client.get("/crimes/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_add_crime():
    response = client.post("/crimes/", json={"id": 1, "type": "Burglary", "location": "123 Main St", "description": "Stole jewelry"})
    assert response.status_code == 200
    assert response.json()["type"] == "Burglary"
