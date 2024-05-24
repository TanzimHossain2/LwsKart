import axios, { AxiosError } from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 3000,
});

export function isAxiosError(error: any): error is AxiosError {
  return error.isAxiosError === true;
}
