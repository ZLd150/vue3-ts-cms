import router from "@/router";
import { Module } from "vuex";
import cache from "@/utils/cache";
import loginApi, { UserInfoType, RoleMenuType } from "@/api/login";
import { newMapMenus, menuMapPermission } from "@utils/mapRouter";

type State = Record<string, any>;

const loginModule: Module<Store.LoginState, Store.RootState> = {
  namespaced: true,
  state: () => {
    return {
      token: "",
      userInfo: {},
      userMenus: [],
      permissionList: []
    };
  },
  getters: {
    userBaseInfo(state: State): Record<string, any> {
      return { ...state };
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
      cache.setCache("token", token);
    },
    changeUserInfo(state, userInfo: UserInfoType) {
      state.userInfo = userInfo;
      cache.setCache("userInfo", userInfo);
    },
    changeUserMenus(state, userMenus: RoleMenuType[]) {
      state.userMenus = userMenus;
      cache.setCache("userMenus", userMenus);
      // 根据菜单动态注册路由
      const routes = newMapMenus(userMenus);
      routes.forEach((t) => router.addRoute("main", t));
      // 根据菜单生成权限数组
      state.permissionList = menuMapPermission(userMenus);
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
      !menuList.length || commit("changeUserMenus", menuList);
      // 4.跳转到首页
      router.push("/main");
    },
    // 解决刷新页面时vuex数据丢失的问题
    loadLocalLogin({ commit }) {
      const token = cache.getCache("token");
      !token || commit("changeToken", token);
      const userInfo = cache.getCache("userInfo");
      !userInfo || commit("changeUserInfo", userInfo);
      const userMenus = cache.getCache("userMenus");
      !userMenus.length || commit("changeUserMenus", userMenus);
    },
    // 重置动态路由
    resetRoutes({ commit }, payload: RoleMenuType[]) {
      commit("changeUserRoutes", payload);
    }
  }
};

export { loginModule as default };
