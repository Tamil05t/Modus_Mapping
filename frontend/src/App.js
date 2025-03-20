import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { login, getCrimes } from "./api";
import CrimeForm from "./components/CrimeForm";
import CrimeList from "./components/CrimeList";
import Heatmap from "./components/Heatmap";
import GraphView from "./components/GraphView";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./styles.css";

function App() {
    const [token, setToken] = useState("");
    const [crimes, setCrimes] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    // ✅ Toggle dark mode
    const toggleDarkMode = () => setDarkMode((prev) => !prev);

    // ✅ Handle login
    const handleLogin = async () => {
        try {
            const response = await login("admin", "admin");
            if (response?.access_token) {
                setToken(response.access_token);
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    // ✅ Memoized fetchCrimes to prevent unnecessary re-renders
    const fetchCrimes = useCallback(async () => {
        if (token) {
            try {
                const data = await getCrimes(token);
                setCrimes(data);
            } catch (error) {
                console.error("Failed to fetch crimes:", error);
            }
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            fetchCrimes();
        }
    }, [token, fetchCrimes]);

    return (
        <Router>
            <div className={darkMode ? "dark-mode" : "light-mode"}>
                <header>
                    <button onClick={toggleDarkMode}>
                        {darkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                    <button onClick={handleLogin}>Login</button>
                </header>

                <main>
                    <Routes>
                        <Route path="/" element={<Login setToken={setToken} />} />
                        <Route 
                            path="/dashboard" 
                            element={token ? (
                                <Dashboard crimes={crimes} />
                            ) : (
                                <Navigate to="/" />
                            )} 
                        />
                        <Route 
                            path="/crime" 
                            element={token ? (
                                <>
                                    <CrimeForm token={token} />
                                    <CrimeList crimes={crimes} />
                                    <Heatmap crimes={crimes} />
                                    <GraphView crimes={crimes} />
                                </>
                            ) : (
                                <Navigate to="/" />
                            )} 
                        />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
