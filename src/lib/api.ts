import axios from "axios";

export const api = axios.create({
  baseURL: "https://nossa-cidade-api.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
