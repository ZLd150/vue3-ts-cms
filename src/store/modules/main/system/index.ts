import { Module } from "vuex";
import systemApi, {
  QueryInfo,
  UserItem,
  RoleItem,
  GoodsItem,
  MenuItem
} from "@/api/main/system";

type State = Record<string, any>;
type PageData = UserItem | RoleItem | GoodsItem | MenuItem;
type payloadType = { pageName: string; queryInfo: QueryInfo };
type PageDataListPayload = { [key: string]: PageData[] };
type PageDataCountPayload = { [key: string]: number };

const systemModule: Module<Store.SystemState, Store.RootState> = {
  namespaced: true,
  state: () => {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    };
  },
  getters: {
    pageListData(state: State) {
      return (pageName: string): any[] => {
        return state[pageName + "List"];
      };
    },
    pageCount(state: State) {
      return (pageName: string): number => {
        return state[pageName + "Count"];
      };
    }
  },
  mutations: {
    changePageDataList(state: State, payload: PageDataListPayload) {
      const [[key, value]] = Object.entries(payload);
      state[key] = value;
    },
    changePageDataCount(state: State, payload: PageDataCountPayload) {
      const [[key, value]] = Object.entries(payload);
      state[key] = value;
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: payloadType) {
      const { pageName, queryInfo } = payload;
      // 请求数据列表
      const {
        data: { list, totalCount }
      } = await systemApi.getPageListData("/" + pageName + "/list", queryInfo);
      commit("changePageDataList", { [pageName + "List"]: list });
      commit("changePageDataCount", {
        [pageName + "Count"]: totalCount ?? list.length
      });
    }
  }
};

export { systemModule as default };
