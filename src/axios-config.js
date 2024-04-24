import axios from "axios";

const instance = axios.create({
  baseURL: "https://todo-server-spoj.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance