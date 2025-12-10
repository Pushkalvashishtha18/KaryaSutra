import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export const api = axios.create({
  baseURL: API_BASE,
});

// Add interceptors for public API to help debug
api.interceptors.request.use(
  (config) => {
    console.log("Public API Request:", config.method?.toUpperCase(), config.url, "Base URL:", API_BASE);
    return config;
  },
  (error) => {
    console.error("Public API Request Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Public API Response:", response.status, response.config.url, "Data length:", response.data?.length);
    return response;
  },
  (error) => {
    console.error("Public API Response Error:", {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

export const authApi = (token) => {
  if (!token) {
    console.error("authApi called without token");
    return null;
  }

  const instance = axios.create({
    baseURL: API_BASE,
    headers: { Authorization: `Bearer ${token}` },
  });

  // Intercept requests to handle FormData properly
  instance.interceptors.request.use(
    (config) => {
      if (config.data instanceof FormData) {
        // Don't set Content-Type for FormData - browser will set it with boundary
        delete config.headers["Content-Type"];
      }
      console.log("API Request:", config.method?.toUpperCase(), config.url);
      return config;
    },
    (error) => {
      console.error("Request interceptor error:", error);
      return Promise.reject(error);
    }
  );

  // Intercept responses for error handling
  instance.interceptors.response.use(
    (response) => {
      console.log("API Response:", response.status, response.config.url);
      return response;
    },
    (error) => {
      console.error("API Error:", error.response?.status, error.config?.url);
      if (error.response?.status === 401) {
        console.error("Unauthorized - token may be invalid");
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

