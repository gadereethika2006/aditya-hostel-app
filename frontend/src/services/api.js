import axios from "axios";

const API = axios.create({
  baseURL: "https://aditya-hostel-app-1.onrender.com/api" // Update this to your backend URL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
