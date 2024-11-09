import axios from "axios";

// Initialize axios instance
const API_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = "RJS1-202410";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "api-key": API_KEY,
  },
});

// function to request API
const apiRequest = async (method, url, payload = null, params = null) => {
  try {
    const response = await api({
      method,
      url,
      data: payload,
      params,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};

export default apiRequest;
