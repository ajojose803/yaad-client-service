import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const createAxiosAdmin = (): AxiosInstance => {
  const axiosAdmin: AxiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin`,
    withCredentials: true, // Ensures the browser sends the HttpOnly cookie
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Set a request timeout (e.g., 10 seconds)
  axiosAdmin.defaults.timeout = 10000;

  // Variables to manage refresh token queueing
  let isRefreshing = false;
  let failedQueue: Array<{ resolve: (token: string) => void; reject: (error: any) => void }> = [];

  // Process queued requests once refresh is complete
  const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((promise) => {
      if (error) {
        promise.reject(error);
      } else {
        promise.resolve(token!);
      }
    });
    failedQueue = [];
  };

  // Request interceptor: No need to attach the token manually since it's in the cookie.
  axiosAdmin.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => config,
    (error: AxiosError) => Promise.reject(error)
  );

  // Response interceptor: Handle 401 errors by attempting a token refresh.
  axiosAdmin.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      // Check for 401 errors, and ensure we haven't already retried this request.
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          // If a refresh is already in progress, queue the request.
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(() => axiosAdmin(originalRequest));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // Call the refresh endpoint; it should read the current cookie and issue a new one.
          await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/refresh`,
            {},
            { withCredentials: true }
          );
          // Process any queued requests now that the refresh is done.
          processQueue(null, 'refreshed'); // The token value isn't used here.
          // Retry the original request.
          return axiosAdmin(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          // Optionally, you can redirect to the login page if refresh fails.
          // e.g., window.location.href = '/admin/login';
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosAdmin;
};

export default createAxiosAdmin;
