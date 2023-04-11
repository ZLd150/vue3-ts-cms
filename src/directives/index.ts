import { App } from "vue";
import permission from "./permission";

export default (app: App) => {
  // 注册权限指令
  app.directive("permission", permission());
};
