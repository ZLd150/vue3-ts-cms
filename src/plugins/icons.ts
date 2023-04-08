import * as Icons from "@element-plus/icons-vue";
import type { App } from "vue";

export default {
  install(app: App) {
    // 注册图标
    Object.entries(Icons).forEach(([key, val]) => {
      app.component(key, val);
    });
  }
};
