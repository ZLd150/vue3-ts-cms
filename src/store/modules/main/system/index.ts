import { Module } from "vuex";
import systemApi, { QueryInfo } from "@/api/main/system";

type payloadType = { pageUrl: string; queryInfo: QueryInfo };

const systemModule: Module<Store.SystemState, Store.RootState> = {
  namespaced: true,
  state: () => {
    return {
      userList: [],
      userCount: 0
    };
  },
  mutations: {
    changeUserList(state, userList: QueryInfo[]) {
      state.userList = userList;
    },
    changeUserCount(state, totalCount: number) {
      state.userCount = totalCount;
    }
  },
  actions: {
    async getPageListAction({ commit }, pauload: payloadType) {
      const { pageUrl, queryInfo } = pauload;
      // 请求用户列表
      const {
        data: { list, totalCount }
      } = await systemApi.getPageListData(pageUrl, queryInfo);
      if (list.length) {
        commit("changeUserList", list);
        commit("changeUserCount", totalCount);
      }
    }
  }
};

export { systemModule as default };
