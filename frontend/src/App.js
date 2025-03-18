import React, { useState, useEffect } from "react";
import { login, getCrimes } from "./api";
import CrimeForm from "./components/CrimeForm";
import GraphView from "./components/GraphView";
import CrimeList from "./components/CrimeList";
import Heatmap from "./components/Heatmap";
import "./styles.css";

function App() {
    const [crimes, setCrimes] = useState([]);
    const [token, setToken] = useState("");
    const [darkMode, setDarkMode] = useState(false);

    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    // Handle login
    const handleLogin = async () => {
        const response = await login("admin", "admin");
        if (response?.access_token) {
            setToken(response.access_token);
        }
    };

    // Fetch crimes after login
    const fetchCrimes = async () => {
        if (token) {
            const data = await getCrimes(token);
            setCrimes(data);
        }
    };

    useEffect(() => {
        fetchCrimes();
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
