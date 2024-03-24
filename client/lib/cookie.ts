import { getCookie, setCookie } from "cookies-next";
import axios from "axios";


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