/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "*.less" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "element-plus/dist/locale/zh-cn.mjs" {
  const zhCn: Record<readonly [key: string], any>;
  export default zhCn;
}

declare module "*.json";
