import type { AxiosRequestConfig, AxiosResponse } from "axios";

// 接口的泛型
export interface RequstInterceptors<T = AxiosResponse> {
  // 请求成功拦截
  requestInterceptors?: (confgi: AxiosRequestConfig) => AxiosRequestConfig;
  // 请求失败拦截
  requestInterceptorsCatch?: (error: any) => any;
  // 响应成功拦截
  responseInterceptors?: (confgi: T) => T;
  // 响应失败拦截
  responseInterceptorsCatch?: (error: any) => any;
}

// 接口扩展
export interface RequstConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequstInterceptors<T>;
  isShowLoading?: boolean;
}
