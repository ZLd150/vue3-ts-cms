import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import store, { setupStore } from "./store";
import icons from "./plugins/icons";
import ElementPlus from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

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
// 注册全局icons
app.use(icons);

app.mount("#app");

// console.log("VUE_APP_BASE_URL>>>", process.env.VUE_APP_BASE_URL);
// console.log("VUE_APP_BASE_NAME>>>", process.env.VUE_APP_BASE_NAME);
