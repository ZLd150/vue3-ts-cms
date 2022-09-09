declare namespace Store {
  export interface RootState {
    name: string;
    age: number;
  }

  // 登录
  export interface LoginState {
    token: string;
    userInfo: unknown;
    userMenus: unknown;
  }

  type LoginStoreType = {
    login: LoginState;
  };

  export type StoreType = LoginStoreType & RootState;
}
