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
  menuList: MenuItem[];
}

export interface GoodsItem {
  id: number;
  name: string;
  oldPrice: string;
  newPrice: string;
  desc: string;
  status: number;
  imgUrl: string;
  inventoryCount: number;
  saleCount: number;
  favorCount: number;
  address: string;
  categoryId: number;
  createAt: string;
  updateAt: string;
}

export interface MenuItem {
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

export type CreateUser = {
  name: string;
  realname: string;
  password: string;
  cellphone: string;
  departmentId: string;
  roleId: string;
};

export type EditUser = {
  name?: string;
  realname?: string;
  cellphone?: string;
  departmentId?: string;
  roleId?: string;
};

export interface Department {
  id: number;
  name: string;
  parentId: number;
  createAt: string;
  updateAt: string;
  leader: string;
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
  ): Promise<
    System.ResponseGeneric<{
      list: (UserItem | RoleItem | GoodsItem | Department)[];
      totalCount: number;
    }>
  > {
    return await request.post({ url, data: queryInfo });
  }
  /**
   * 删除页面相关项目
   * @url 请求地址
   * @returns
   */
  static async deletePageItem(
    url: string
  ): Promise<System.ResponseGeneric<{ data: string }>> {
    return await request.delete({ url });
  }

  /**
   * 模块创建API
   * @param {string} url 请求地址
   * @params 参数对象
   * @returns
   */
  static async createInfo(
    url: string,
    params: Record<string, any>
  ): Promise<System.ResponseGeneric<string>> {
    return await request.post({ url, data: params });
  }

  /**
   * 模块修改API
   * @param {string} url 请求地址
   * @params 参数对象
   * @returns
   */
  static async editInfo(
    url: string,
    params: Record<string, any>
  ): Promise<System.ResponseGeneric<string>> {
    return await request.patch({ url, data: params });
  }
}

export { SystemApi as default };
