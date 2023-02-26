declare namespace Store {
  export interface RootState {
    login?: LoginState;
    system?: SystemState;
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

  // 系统管理
  export interface SystemState {
    userList: unknown;
    userCount: number;
  }
}
