import { createStore, Store, useStore as useVuexStore } from "vuex";
import login from "./modules/login";
import system from "./modules/main/system";

const store = createStore<Store.RootState>({
  state: () => {
    return {};
  },
  mutations: {},
  actions: {},
  getters: {},
  modules: { login, system }
});

const useStore = (): Store<Store.StoreType> => useVuexStore();
const setupStore = () => store.dispatch("login/loadLocalLogin");

export { store as default, useStore, setupStore };
