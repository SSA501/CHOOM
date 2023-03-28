import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://j8a501.p.ssafy.io/api",
  // baseURL: "http://localhost:8080/api",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});
