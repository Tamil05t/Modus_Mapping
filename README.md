### 🛡️ **ModusMapping - Offline Crime Analysis with AI & Visualization**

🚀 **ModusMapping** is an offline-first crime analysis tool powered by **AI** for crime summarization, **modus operandi detection**, and **visualizations**. It supports **offline data storage** and **synchronization with Neo4j** when online.

---

### 🔥 **Key Features**
✅ **Offline-First Functionality**: Store and analyze crime data without internet access.  
✅ **AI-Powered Analysis**: Named Entity Recognition (NER) & Summarization models.  
✅ **Real-Time Crime Clustering**: Visualize crime patterns with D3.js & Cytoscape.js.  
✅ **Heatmap & Graph View**: Display crime locations and suspect connections.  
✅ **Secure Authentication**: JWT-based authentication with encryption.  
✅ **Dockerized Deployment**: Easy setup with Docker Compose.  
✅ **Batch Syncing**: Sync SQLite data with Neo4j in batches for efficiency.  

---

### 📌 **Tech Stack**
- **Backend:** FastAPI, SQLite (Offline), Neo4j (Online), JWT Auth, TensorFlow, ONNX  
- **Frontend:** React.js, D3.js, Cytoscape.js, Leaflet.js, LocalStorage  
- **Deployment:** Docker & Docker Compose  

---

Here’s the **rewritten and corrected installation instructions** with proper formatting and clarity, including emojis for better readability:

---

## 🚀 **Installation Instructions**

### ✅ **1. Clone the Repository**
Clone the ModusMapping repository and navigate into the project directory:
```bash
git clone https://github.com/Tamil05t/Modus_Mapping.git
cd Modus_Mapping
```

---

### ✅ **2. Install Backend Dependencies**
Navigate to the `backend` directory and install the required Python dependencies:
```bash
cd backend
pip install -r requirements.txt
```

---

### ✅ **3. Install Frontend Dependencies**
Navigate to the `frontend` directory and install the required Node.js dependencies:
```bash
cd ../frontend
npm install
```

---

### ✅ **4. Run the App with Docker**
Go back to the root directory and build/run the Docker containers:
```bash
cd ..
docker-compose up --build
```

---

## 📊 **Usage**

### 🌟 **Frontend (Crime Dashboard)**
Open the app in your browser:
```
http://localhost:3000
```
Perform the following actions:
- **Add Crime Records**
- **Filter Crimes by Type, Location, and Time**
- **View Crime Heatmaps & Graph Connections**
- **Toggle between Light and Dark Mode**

---

### 🔥 **Backend (API)**
Access the API endpoints:
```
http://localhost:8000/docs
```
**API Endpoints**:
- `POST /token` → Login and get JWT token.
- `GET /crimes/` → Fetch all crimes.
- `POST /crimes/` → Add a new crime.
- `POST /sync/` → Sync local SQLite data with Neo4j.

---

## 🔥 **Testing**

### ✅ **Backend Unit Tests**
Navigate to the `backend` directory and run the unit tests:
```bash
cd backend
pytest tests/
```

### ✅ **Frontend Unit Tests**
Navigate to the `frontend` directory and run the unit tests:
```bash
cd frontend
npm test
```

---

## 🚀 **Deployment Instructions**

### **Build Docker Images**
Build the Docker images for the backend and frontend:
```bash
docker-compose build
```

### **Run the App**
Start the Docker containers:
```bash
docker-compose up
```

### **Access the App**
- **Frontend**: Open `http://localhost:3000` in your browser.
- **Backend API**: Access `http://localhost:8000/docs` for the Swagger UI.

---

### **Final Notes**
- Ensure Docker is installed and running on your system.
- If you encounter any issues, check the logs using:
  ```bash
  docker-compose logs
  ```
---

### 🔥 **Contributing**
Feel free to contribute by creating pull requests or opening issues.  

---

### 🔥 **License**
This project is licensed under the **MIT License**.

---
