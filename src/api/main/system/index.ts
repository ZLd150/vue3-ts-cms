import request from "@api/index";
export interface UserItem {
  id: number;
  name: string;
  realname: string;
  cellphone: number;
  enable: number;
  departmentId: number;
  roleId: number;
  createAt: string;
  updateAt: string;
}
export interface QueryInfo {
  offset: number;
  size: number;
}

export interface RoleItem {
  id: number;
  name: string;
  intro: string;
  createAt: string;
  updateAt: string;
  menuList: MenuList[];
}

interface MenuList {
  id: number;
  name: string;
  type: number;
  url: string;
  icon: string;
  sort: number;
  children: Child[];
}

interface Child {
  id: number;
  url: string;
  name: string;
  sort: number;
  type: number;
  children?: any;
  parentId: number;
}

class SystemApi {
  /**
   * 请求用户列表
   * @url 请求地址
   * @queryInfo 偏移量与数据量
   * @returns
   */
  static async getPageListData(
    url: string,
    queryInfo: QueryInfo
  ): Promise<System.ResponseGeneric<{ list: UserItem[]; totalCount: number }>> {
    return await request.post({ url, data: queryInfo });
  }
}

export { SystemApi as default };
