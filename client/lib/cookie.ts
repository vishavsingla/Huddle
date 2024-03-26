import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import axios from 'axios';
import { cookies } from 'next/headers';
const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post('/auth/refresh-token', null, {
          withCredentials: true,
        });

        const newAccessToken = response.data.accessToken;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err) {
        console.error('Failed to refresh access token', err);
        // Handle refresh token error (e.g., redirect to login)
      }
    }

    return Promise.reject(error);
  }
);

export const logOut = async () => {
  try {
    await api.post('/auth/logout');
    deleteCookie('accessToken');
    deleteCookie('sessionToken');
    window.location.href = '/login';
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export default api;
export const sessionToken = getCookie('sessionToken',{cookies});
export const accessToken = getCookie('accessToken',{cookies});