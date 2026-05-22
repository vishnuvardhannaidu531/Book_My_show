import axios from "axios";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../constants/config";
import { storage } from "../utils/storage";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const authClient = axios.create({
  headers: { "Content-Type": "application/json" },
});

const attachAuthToken = (config) => {
  const token = storage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

apiClient.interceptors.request.use(attachAuthToken);
authClient.interceptors.request.use(attachAuthToken);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      storage.clearAuth();
      toast.error("Session expired. Please login again.");
      window.dispatchEvent(new Event("movieverse:unauthorized"));
    }
    return Promise.reject(error);
  },
);

export const getApiError = (error, fallback = "Something went wrong") =>
  error.response?.data?.message || error.response?.data || error.message || fallback;
