declare namespace System {
  export interface Response {
    code: number;
    success?: boolean;
    msg?: string;
  }

  export interface ResponseGeneric<T> extends Response {
    data: T;
  }
}
