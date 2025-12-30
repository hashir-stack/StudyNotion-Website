import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.VITE_API_URL || "http://localhost:4000/api/v1",
  withCredentials: true,
});

// Request interceptor to attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const apiConnector = (method, url, bodyData, headers = {}, params = {}) => {
  return axiosInstance({
    method,
    url,
    data: bodyData || null,
    headers: { ...headers },   // ✅ only custom headers
    params: { ...params },
  });
};
