import axios from "axios";
import { TOKEN_FAKE } from "../constant";
import { API_URL } from "./config";

const AxiosInstance = axios.create({
  baseURL: API_URL,
});

AxiosInstance.interceptors.request.use(
  (request: any) => {
    let accessToken: string = localStorage.getItem("accessToken") || TOKEN_FAKE;
    let userId: string = localStorage.getItem("userId") || "";
    request.headers["Accept"] = "application/json";
    request.headers["Authorization"] = `Bearer ${accessToken}`;
    request.headers["UserId"] = `${userId}`;
    request.headers["Content-Type"] = "application/json; charset=utf-8";
    // console.log(request);
    return request;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (v: any) => v,
  async (error: any) => {
    const originalConfig = error?.config;

    if (originalConfig && error?.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
