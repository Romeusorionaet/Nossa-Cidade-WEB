import axios from "axios";

export const api = axios.create({
  baseURL: process.env.MY_API_NODE,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
