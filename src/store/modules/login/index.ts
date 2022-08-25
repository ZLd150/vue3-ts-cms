import { Module } from "vuex";
import cache from "@/utils/cache";
import loginApi, { UserInfoType } from "@/api/login";

const loginModule: Module<Store.LoginState, Store.RootState> = {
  namespaced: true,
  state: () => {
    return {
      token: "",
      userInfo: {}
    };
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
      cache.setCache("token", token);
    },
    changeUserInfo(state, userInfo: UserInfoType) {
      state.userInfo = userInfo;
      cache.setCache("userInfo", userInfo);
    }
  },
  actions: {
    // 账号登录
    async accountLoginAction({ commit }, payload: System.Login.Account) {
      // 1.进行登录获取id与token信息
      const {
        data: { id, token }
      } = await loginApi.accountLoginRequest(payload);
      !token || commit("changeToken", token);
      // 2.请求用户信息
      const { code, data } = await loginApi.requestUserInfo(id);
      code !== 0 || commit("changeUserInfo", data);
      // 3.请求用户角色信息
      const { data: menuList = [] } = await loginApi.queryUserMenus(
        data.role.id
      );
      console.log("menuList>>>", menuList);
    },
    // 手机登录
    phoneLoginAction({ commit }, payload: any) {
      console.log("执行了phoneLoginAction>>>", payload);
    }
  },
  getters: {}
};

export { loginModule as default };
