import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";

import "element-plus/theme-chalk/index.css";

import "./api/test";

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");

console.log("VUE_APP_BASE_URL>>>", process.env.VUE_APP_BASE_URL);
console.log("VUE_APP_BASE_NAME>>>", process.env.VUE_APP_BASE_NAME);
