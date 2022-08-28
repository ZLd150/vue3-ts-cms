import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import * as Icons from "@element-plus/icons-vue";

import "./assets/css/index.less";
import "element-plus/theme-chalk/index.css";

const app = createApp(App);
app.use(router);
app.use(store);

// 注册图标
Object.entries(Icons).forEach(([key, val]) => app.component(key, val));
app.mount("#app");

// console.log("VUE_APP_BASE_URL>>>", process.env.VUE_APP_BASE_URL);
// console.log("VUE_APP_BASE_NAME>>>", process.env.VUE_APP_BASE_NAME);
