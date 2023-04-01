import { Module } from "vuex";
import systemApi, { QueryInfo, UserItem, RoleItem } from "@/api/main/system";

type Stare = Record<string, any>;
type payloadType = { pageName: string; queryInfo: QueryInfo };
type PageDataListPayload = { [key: string]: (UserItem | RoleItem)[] };
type PageDataCountPayload = { [key: string]: number };

const systemModule: Module<Store.SystemState, Store.RootState> = {
  namespaced: true,
  state: () => {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0
    };
  },
  getters: {
    pageListData(state: Stare) {
      return (pageName: string): any[] => {
        return state[pageName + "List"];
      };
    },
    pageCount(state: Stare) {
      return (pageName: string): number => {
        return state[pageName + "Count"];
      };
    }
  },
  mutations: {
    changePageDataList(state: Stare, payload: PageDataListPayload) {
      const [[key, value]] = Object.entries(payload);
      state[key] = value;
    },
    changePageDataCount(state: Stare, payload: PageDataCountPayload) {
      const [[key, value]] = Object.entries(payload);
      state[key] = value;
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: payloadType) {
      const { pageName, queryInfo } = payload;
      // 请求用户列表
      const {
        data: { list, totalCount }
      } = await systemApi.getPageListData("/" + pageName + "/list", queryInfo);
      commit("changePageDataList", { [pageName + "List"]: list });
      commit("changePageDataCount", { [pageName + "Count"]: totalCount });
    }
  }
};

export { systemModule as default };
