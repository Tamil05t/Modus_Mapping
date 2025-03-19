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

Here’s the **rewritten guide** formatted for a **GitHub README page**. You can copy and paste this directly into your `README.md` file:

---

# 🚀 ModusMapping - Crime Analysis Dashboard

ModusMapping is an **offline-first crime analysis tool** powered by AI for crime summarization, modus operandi detection, and visualizations. It supports **offline data storage** and **synchronization with Neo4j** when online.

---

## 🛠️ Installation Instructions (Docker Only)

### ✅ **1. Clone the Repository**
Clone the ModusMapping repository and navigate into the project directory:
```bash
git clone https://github.com/Tamil05t/Modus_Mapping.git
cd Modus_Mapping
```

---

### ✅ **2. Build and Run the Docker Containers**
Run the following command to build the Docker images and start the containers:
```bash
docker-compose up --build
```

This command will:
1. Build the backend and frontend Docker images.
2. Install all dependencies **inside the Docker containers** (no need to run `pip install` or `npm install` manually).
3. Start the backend and frontend services.

---

## 📊 Usage

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

## 🔥 Testing

### ✅ **Backend Unit Tests**
To run the backend unit tests, execute the following command:
```bash
docker-compose exec backend pytest tests/
```

### ✅ **Frontend Unit Tests**
To run the frontend unit tests, execute the following command:
```bash
docker-compose exec frontend npm test
```

---

## 🚀 Deployment Instructions

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

## 🛠️ Troubleshooting

### **Check Logs**
If you encounter any issues, check the logs using:
```bash
docker-compose logs
```

### **Port Conflicts**
Ensure ports `3000` (frontend) and `8000` (backend) are not already in use. You can change the ports in the `docker-compose.yml` file if needed.

---

## 🚀 Why This Works
- The `Dockerfile` for the backend includes a step to install dependencies:
  ```dockerfile
  RUN pip install --no-cache-dir -r requirements.txt
  ```
- The `Dockerfile` for the frontend includes a step to install dependencies:
  ```dockerfile
  RUN npm install
  ```
- Docker handles everything, so you don’t need to manually install dependencies or set up a virtual environment.

---

## 📄 License
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🙌 Contributing
Feel free to contribute by creating pull requests or opening issues.

---
