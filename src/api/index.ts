import baseRequest from "./request/axios";
import { BASE_URL, TIME_OUT } from "./request/config";
import cache from "@utils/cache";

const request = new baseRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptors: (config) => {
      // 携带token的拦截
      const token = cache.getCache("token");
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    requestInterceptorsCatch: (err) => {
      return err;
    },
    responseInterceptors: (res) => {
      return res;
    },
    responseInterceptorsCatch: (err) => {
      return err;
    }
  }
});

export default request;
