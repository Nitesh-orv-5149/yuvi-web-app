import axios from "axios";

const axiosAdmin = axios.create({
  baseURL: "/api/admin", 
});


axiosAdmin.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("adminToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosAdmin;
