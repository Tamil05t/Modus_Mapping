# ModusMapping API Documentation

## Endpoints

### Authentication
- **POST /token**: Login and get JWT token.
  - Request Body: `{"username": "admin", "password": "admin"}`
  - Response: `{"access_token": "jwt-token", "token_type": "bearer"}`

### Crimes
- **GET /crimes/**: Fetch all crimes.
- **POST /crimes/**: Add a new crime.
  - Request Body: `{"id": 1, "type": "Burglary", "location": "123 Main St", "description": "Stole jewelry"}`
