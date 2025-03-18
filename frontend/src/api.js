import axios from "axios";

const API_URL = "http://localhost:8000";

// Generic function for handling API requests
const apiRequest = async (method, url, data = {}, token = null) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios({
      method,
      url: `${API_URL}${url}`,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error(`API ${method.toUpperCase()} request failed:`, error);
    throw error;
  }
};

// Login function
export const login = async (username, password) => {
  return await apiRequest("post", "/token", { username, password });
};

// Get crimes
export const getCrimes = async (token) => {
  return await apiRequest("get", "/crimes", {}, token);
};

// Add a new crime
export const addCrime = async (crime, token) => {
  return await apiRequest("post", "/crimes", crime, token);
};

// Update an existing crime (optional)
export const updateCrime = async (id, crime, token) => {
  return await apiRequest("put", `/crimes/${id}`, crime, token);
};

// Delete a crime (optional)
export const deleteCrime = async (id, token) => {
  return await apiRequest("delete", `/crimes/${id}`, {}, token);
};
