import { createStore } from "vuex";
import login from "./modules/login";

const store = createStore<Store.RootState>({
  state: () => {
    return {
      name: "zl",
      age: 29
    };
  },
  mutations: {},
  actions: {},
  getters: {},
  modules: { login }
});

export default store;
