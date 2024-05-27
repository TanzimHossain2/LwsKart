import appConfig from "@/config";
import axios, { AxiosError } from "axios";

export const axiosInstance = axios.create({
  baseURL: appConfig.baseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


