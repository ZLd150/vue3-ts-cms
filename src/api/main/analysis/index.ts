import request from "../../index";
const BASE = "/goods/category";

export interface Count {
  id: number;
  name: string;
  goodsCount: number;
}
export interface Favor {
  id: number;
  name: string;
  goodsFavor: number;
}
export interface Top10 {
  id: number;
  name: string;
  saleCount: number;
}
export interface Sale {
  address: string;
  count: number;
}
export interface AmountItem {
  amount: string;
  title: string;
  tips: string;
  subtitle: string;
  number1: number;
  number2: number;
}

class goodsStatistics {
  /**
   * 获取每个分类商品的个数
   * @returns
   */
  static async getCategroyCount(): Promise<System.ResponseGeneric<Count[]>> {
    return await request.get({ url: BASE + "/count" });
  }
  /**
   * 获取每个分类商品的销量
   * @returns
   */
  static async getCategroySale(): Promise<System.ResponseGeneric<Count[]>> {
    return await request.get({ url: BASE + "/sale" });
  }
  /**
   * 获取每个分类商品的收藏
   * @returns
   */
  static async getCategroyFavor(): Promise<System.ResponseGeneric<Favor[]>> {
    return await request.get({ url: BASE + "/favor" });
  }
  /**
   * 获取销量前10的商品数量
   * @returns
   */
  static async getSaleTop10(): Promise<System.ResponseGeneric<Top10[]>> {
    return await request.get({ url: "/goods/sale/top10" });
  }
  /**
   * 获取不同城市的销量数据
   * @returns
   */
  static async getAddressSale(): Promise<System.ResponseGeneric<Sale[]>> {
    return await request.get({ url: "/goods/address/sale" });
  }
  /**
   * 获取商品统计数据
   * @returns
   */
  static async getAmountList(): Promise<System.ResponseGeneric<AmountItem[]>> {
    return await request.get({ url: "/goods/amount/list" });
  }
}

export { goodsStatistics as default };
