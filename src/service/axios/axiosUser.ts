import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import useAuthStore from "@/service/store/UserAuthStore"; 

const createAxios = (): AxiosInstance => {
  const axiosUser: AxiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  // Request Interceptor - Attach Access Token from Zustand
  axiosUser.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const { accessToken } = useAuthStore.getState(); // Get token from Zustand
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  // Response Interceptor - Handle 401 & Refresh Token
  axiosUser.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Call refresh endpoint (uses HTTP-only cookies)
          const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`, {}, { withCredentials: true });

          const newAccessToken = response.data.accessToken;

          // Update Zustand store
          useAuthStore.getState().setAccessToken(newAccessToken);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosUser(originalRequest);
        } catch (refreshError) {
          console.error("Refresh Token Failed:", refreshError);
          useAuthStore.getState().userLogout();
          window.location.href = "/signin";
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosUser;
};

export default createAxios;
