import { getCookie, getCookies, setCookie } from "cookies-next";
import axios from "axios";
import { cookies } from 'next/headers';

export const generateRefreshToken = async () => {
    try {
      const response = await axios.get(`/generate-token`, {
        withCredentials: true,
      });
      const { data } = response;
      return data;
    } catch (error: any) {
      console.error(error);
    }
};

export const sessionToken = getCookie('sessionToken',{cookies});
export const refreshToken = getCookie('refreshToken',{cookies});
export const accessToken = getCookie('accessToken',{cookies});
