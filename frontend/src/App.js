import React, { useState, useEffect } from "react";
import { login, getCrimes } from "./api";
import CrimeForm from "./components/CrimeForm";
import CrimeList from "./components/CrimeList";
import Heatmap from "./components/Heatmap";
import GraphView from "./components/GraphView";
import "./styles.css";

function App() {
    const [crimes, setCrimes] = useState([]);
    const [token, setToken] = useState("");
    const [darkMode, setDarkMode] = useState(false);

    // Dark mode toggle
    const toggleDarkMode = () => setDarkMode((prev) => !prev);

    // Handle login
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

    // Fetch crime data
    const fetchCrimes = async () => {
        if (token) {
            try {
                const data = await getCrimes(token);
                setCrimes(data);
            } catch (error) {
                console.error("Failed to fetch crimes:", error);
            }
        }
    };

    useEffect(() => {
        if (token) fetchCrimes();
    }, [token]);

    return (
        <div className={darkMode ? "dark-mode" : "light-mode"}>
            <header>
                <button onClick={toggleDarkMode}>
                    {darkMode ? "Light Mode" : "Dark Mode"}
                </button>
                <button onClick={handleLogin}>Login</button>
            </header>

            <main>
                <CrimeForm token={token} />
                <CrimeList crimes={crimes} />
                <Heatmap crimes={crimes} />
                <GraphView crimes={crimes} />
            </main>
        </div>
    );
}

export default App;
