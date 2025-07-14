import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers['X-API-KEY'] = import.meta.env.VITE_API_KEY
  }
  return config
})