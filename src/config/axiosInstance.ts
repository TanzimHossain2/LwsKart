import appConfig from "@/config";
import axios, { AxiosError } from "axios";

export const axiosInstance = axios.create({
  baseURL: appConfig.baseUrl,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

