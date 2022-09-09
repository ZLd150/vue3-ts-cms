import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import ElementPlus from "element-plus";
import * as Icons from "@element-plus/icons-vue";

import "element-plus/dist/index.css";
import "./assets/css/index.less";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(ElementPlus);
// 注册图标
Object.entries(Icons).forEach(([key, val]) => app.component(key, val));
app.mount("#app");

// console.log("VUE_APP_BASE_URL>>>", process.env.VUE_APP_BASE_URL);
// console.log("VUE_APP_BASE_NAME>>>", process.env.VUE_APP_BASE_NAME);
