import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CrimeForm from "./pages/CrimeForm";
import CrimeList from "./pages/CrimeList";
import GraphView from "./pages/GraphView";
import MapView from "./pages/MapView";
import AIAnalysis from "./pages/AIAnalysis";
import Settings from "./pages/Settings";
import { useAuthStore } from "./stores/authStore";
import { login, getCrimes } from "./api";

const App: React.FC = () => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [crimes, setCrimes] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    // ✅ Function to handle login
    const handleLogin = async () => {
        try {
            const response = await login("admin", "admin");
            if (response.access_token) {
                setToken(response.access_token);
                localStorage.setItem("token", response.access_token);
                fetchCrimes(response.access_token);
            }
        } catch (error) {
            console.error("Login failed:", error);
            setError("Failed to login.");
        }
    };

    // ✅ Function to fetch crimes
    const fetchCrimes = async (authToken: string) => {
        try {
            const data = await getCrimes(authToken);
            setCrimes(data);
        } catch (error) {
            console.error("Failed to fetch crimes:", error);
            setError("Failed to fetch crimes.");
        }
    };

    useEffect(() => {
        if (token) {
            fetchCrimes(token);
        }
    }, [token]);

    return (
        <Router>
            <AnimatePresence mode="wait">
                <Routes>
                    <Route
                        path="/login"
                        element={
                            !isAuthenticated ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Login />
                                    <div style={{ padding: "20px" }}>
                                        <h1>Crime Records</h1>

                                        <button onClick={handleLogin} disabled={!!token}>
                                            {token ? "Logged In" : "Login"}
                                        </button>

                                        {error && <p style={{ color: "red" }}>{error}</p>}

                                        <ul>
                                            {crimes.map((crime) => (
                                                <li key={crime.id}>
                                                    <strong>{crime.type}</strong> - {crime.location} - {crime.description}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            ) : (
                                <Navigate to="/dashboard" replace />
                            )
                        }
                    />

                    <Route element={isAuthenticated ? <Layout /> : <Navigate to="/login" replace />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/add-crime" element={<CrimeForm />} />
                        <Route path="/crimes" element={<CrimeList />} />
                        <Route path="/graph" element={<GraphView />} />
                        <Route path="/map" element={<MapView />} />
                        <Route path="/analysis" element={<AIAnalysis />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    </Route>
                </Routes>
            </AnimatePresence>
        </Router>
    );
};

export default App;
