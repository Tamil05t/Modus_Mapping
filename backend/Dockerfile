# Use Python base image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the source code and test files
COPY . .          # This ensures that the `/tests` folder is included

# Run unit tests before starting the app
CMD ["sh", "-c", "pytest tests && uvicorn main:app --host 0.0.0.0 --port 8000"]
