/**
 * This Axios instance is used for making API calls that require authentication.
 * It is specifically designed for Client Side Rendering (CSR) and Next.js.
 * It adds the access token to the header of the request.
 * It also handles refreshing the access token when it expires.
 *
 * For server-side usage, an Axios instance has already been created in ->  /lib/axiosIntercepter.ts.
 */

"use client";

import { useEffect } from "react";
import { axiosInstance } from "@/config/axiosInstance";
import { useSession, getSession, signIn } from "next-auth/react";

// api/auth/token endpoint

const useAxios = () => {
  const { data } = useSession();

  useEffect(() => {
    // Add a request interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        const accessToken = data?.accessToken;

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
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },

      async (err) => {
        const originalRequest = err.config;
        if (err.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = data?.refreshToken;
            const res = await axiosInstance.post("/api/auth/token", {
              refreshToken,
            });

            if (res.status === 201) {
              const newAccessToken = res.data.newToken;

              //todo  save locally

              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;

              return axiosInstance(originalRequest);
            }
          } catch (err) {
            console.log(err);
            return Promise.reject(err);
          }
        }
        return Promise.reject(err);
      }
    );

    //cleanup
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [data]);

  return { axiosInstance };
};

export default useAxios;
