import request from "../index";

enum Login {
  AccountLogin = "/login",
  LoginUserInfo = "/users/",
  UserMenus = "/role/"
}

interface LoginResponseData {
  id: number;
  name: string;
  token: string;
}

export interface UserInfoType {
  id: number;
  name: string;
  realname: string;
  cellphone: number;
  enable: number;
  createAt: string;
  updateAt: string;
  role: Role;
  department: Department;
}

// 部门
interface Department {
  id: number;
  name: string;
  parentId?: any;
  createAt: string;
  updateAt: string;
  leader: string;
}

// 角色
interface Role {
  id: number;
  name: string;
  intro: string;
  createAt: string;
  updateAt: string;
}

interface RoleMenuType {
  id: number;
  name: string;
  type: number;
  url: string;
  icon: string;
  sort: number;
  children: RoleSecondLevelMenu[];
}

interface RoleSecondLevelMenu {
  id: number;
  url: string;
  name: string;
  sort: number;
  type: number;
  children?: RoleThreeLevelMenu[];
  parentId: number;
}

interface RoleThreeLevelMenu {
  id: number;
  url?: string;
  name: string;
  sort?: number;
  type: number;
  parentId: number;
  permission: string;
}

class LoginApi {
  /**
   * 账号登录
   * @param params
   * @returns
   */
  static async accountLoginRequest(
    params: System.Login.Account
  ): Promise<System.ResponseGeneric<LoginResponseData>> {
    return await request.post({
      url: Login.AccountLogin,
      data: params,
      isShowLoading: true
    });
  }

  /**
   * 用户信息
   * @id 用户id
   * @returns
   */
  static async requestUserInfo(
    id: number
  ): Promise<System.ResponseGeneric<UserInfoType>> {
    return await request.get({ url: Login.LoginUserInfo + id });
  }

  /**
   * 用户信息
   * @id 用户id
   * @returns
   */
  static async queryUserMenus(
    id: number
  ): Promise<System.ResponseGeneric<RoleMenuType>> {
    return await request.get({ url: Login.UserMenus + id + "/menu" });
  }
}

export { LoginApi as default };
