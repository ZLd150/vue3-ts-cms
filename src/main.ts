import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import store, { setupStore } from "./store";
import ElementPlus from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import * as Icons from "@element-plus/icons-vue";

import "element-plus/dist/index.css";
import "./assets/css/index.less";

const app = createApp(App);
app.use(ElementPlus, {
  locale: zhCn
});
app.use(store);
// TODO: 优先添加动态路由,避免刷新页面时路由匹配错误
setupStore();
app.use(router);
// 注册图标
Object.entries(Icons).forEach(([key, val]) => app.component(key, val));
app.mount("#app");

// console.log("VUE_APP_BASE_URL>>>", process.env.VUE_APP_BASE_URL);
// console.log("VUE_APP_BASE_NAME>>>", process.env.VUE_APP_BASE_NAME);
