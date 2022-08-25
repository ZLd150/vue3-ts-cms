import axios from "axios";
import type { AxiosInstance } from "axios";
import type { RequstInterceptors, RequstConfig } from "./type";
import type { LoadingInstance } from "element-plus/lib/components/loading/src/loading";

import { ElLoading } from "element-plus";

// 超时
axios.defaults.timeout = 10000;

// 默认的loading状态
const DEFAULT_LOADING = false;

// 封装
class Requst {
  // 实例
  instance: AxiosInstance;
  // 实例拦截器
  interceptors?: RequstInterceptors;
  // loading显示
  isShowLoading: boolean;
  // loading实例
  loading?: LoadingInstance;

  constructor(config: RequstConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    this.isShowLoading = DEFAULT_LOADING;
    // 实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    );

    // 全局封装拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log("全局的请求成功拦截");
        // config.headers = {
        //   Authorization: "123456"
        // };
        // TODO: 全局请求loading
        if (this.isShowLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "加载中......",
            background: "rgba(0, 0, 0, 0.5)"
          });
        }
        return config;
      },
      (err) => {
        // console.log("全局的请求失败拦截", err);
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        // console.log("全局的响应成功拦截");
        const data = res.data;
        // 关闭loading
        this.loading?.close();
        if (data?.success) {
          // console.log("请求失败了巴拉巴拉");
        } else return data;
      },
      (err) => {
        // console.log("全局的响应失败拦截", err);
        if (err.response.status === "400") {
          console.warn("请求失败");
        }
        // 关闭loading
        this.loading?.close();
        return err;
      }
    );
  }

  request<T>(config: RequstConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config);
      }

      // 2-判断当前请求是否需要loading效果
      if (config.isShowLoading === true) {
        this.isShowLoading = config.isShowLoading;
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1-对单个请求的数据进行处理
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res);
          }
          // 3-将结果resolve出去
          resolve(res);
        })
        .catch((err) => {
          reject(err);
          return err;
        })
        // 2-将isShowLoading设置为初始状态,这样不会影响下个请求
        .finally(() => (this.isShowLoading = DEFAULT_LOADING));
    });
  }

  get<T>(config: RequstConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }

  post<T>(config: RequstConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }

  delete<T>(config: RequstConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }

  patch<T>(config: RequstConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
}

export { Requst as default };
