/**
 * This Axios instance is used for making API calls that require authentication.
 * It is specifically designed for Server Side Rendering (SSR) and Next.js.
 * It adds the access token to the header of the request.
 * It also handles refreshing the access token when it expires.
 *
 * For client-side usage, a custom hook called useAxios.ts has already been created to handle the Axios instance.
 */

import { auth } from "@/auth";
import appConfig from "@/config";
import axios from "axios";

/**
 * Axios instance for authenticated API requests.
 */
const axiosAuthApi = axios.create({
  baseURL: appConfig.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
  withCredentials: true,
});

// Add a request interceptor
axiosAuthApi.interceptors.request.use(
  async (config) => {
    const session = await auth();
    const accessToken = session?.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosAuthApi.interceptors.response.use(
  (response) => {
    return response;
  },

  async (err) => {
    const originalRequest = err.config;
    if (err.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const session = await auth();
        const refreshToken = session?.refreshToken;
        const res = await axiosAuthApi.post("/api/auth/token", {
          refreshToken,
        });

        if (res.status === 201) {
          const newAccessToken = res.data.newToken;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosAuthApi(originalRequest);
        }
      } catch (err) {
        console.log(err);

        return Promise.reject(err);
      }
    }
  }
);

export { axiosAuthApi };
