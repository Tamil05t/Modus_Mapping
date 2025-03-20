import axios from "axios";

const API_URL = "http://localhost:8000";  // ✅ Backend URL

// ✅ Login and get JWT token
export const login = async (username, password) => {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    try {
        const response = await axios.post(`${API_URL}/token`, formData, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

// ✅ Get crimes (with JWT token)
export const getCrimes = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/crimes`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching crimes:", error);
        throw error;
    }
};
