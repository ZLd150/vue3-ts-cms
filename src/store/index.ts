import { createStore, Store, useStore as useVuexStore } from "vuex";
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

const useStore = (): Store<Store.StoreType> => useVuexStore();
const setupStore = () => store.dispatch("login/loadLocalLogin");

export { store as default, useStore, setupStore };
