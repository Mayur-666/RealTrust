import axios from "axios";

const instance = axios.create({
  baseURL: "https://real-trust-server.vercel.app",
  //   withCredentials: true,
  maxContentLength: 50 * 1024 * 1024,
  maxBodyLength: 50 * 1024 * 1024,
  headers: { "Content-Type": "application/json" },
});

export default instance;
