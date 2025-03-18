import axios from "axios";

const API_URL = "http://localhost:8000";

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/token`, { username, password });
        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};

export const getCrimes = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/crimes`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch crimes:", error);
        throw error;
    }
};
