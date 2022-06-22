import request from "./axios";

const BASE_URL = "http://123.207.32.32:8080";
// const BASE_URL = "http://152.136.185.210:5000";

const testRequest = new request({
  baseURL: BASE_URL,
  interceptors: {
    requestInterceptors: (config) => {
      console.log("请求成功拦截");
      return config;
    },
    requestInterceptorsCatch: (err) => {
      console.log("请求失败拦截");
      return err;
    },
    responseInterceptors: (res) => {
      console.log("响应成功拦截");
      return res;
    },
    responseInterceptorsCatch: (err) => {
      console.log("响应失败拦截");
      return err;
    }
  }
});

interface DataType {
  data: any;
  returnCode: string;
  success: boolean;
}

testRequest.request({
  url: "/home/multidata",
  method: "GET",
  isShowLoading: false,
  interceptors: {
    requestInterceptors: (config) => {
      console.log("请求自身的拦截");
      return config;
    },
    responseInterceptors: (res) => {
      console.log("请求自身的响应");
      return res;
    }
  }
});

setTimeout(() => {
  testRequest
    .get<DataType>({
      url: "/home/wellCome"
    })
    .then((res) => {
      console.log("res>>>", res);
    });
}, 3000);
