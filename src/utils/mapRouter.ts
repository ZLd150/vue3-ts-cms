import type {
  RoleMenuType,
  RoleSecondLevelMenu,
  RoleThreeLevelMenu
} from "@/api/login";
import type { RouteRecordRaw } from "vue-router";
// 二级菜单组件
const dashboard = () => import("@views/main/analysis/dashboard/Dashboard.vue");
const overview = () => import("@views/main/analysis/overview/Overview.vue");
const category = () => import("@views/main/product/category/Category.vue");
const goods = () => import("@views/main/product/goods/Goods.vue");
const chat = () => import("@views/main/story/chat/Chat.vue");
const list = () => import("@views/main/story/list/List.vue");
const department = () => import("@views/main/system/department/Department.vue");
const menu = () => import("@views/main/system/menu/Menu.vue");
const role = () => import("@views/main/system/role/Role.vue");
const user = () => import("@views/main/system/user/User.vue");

export const vueComponents = {
  dashboard,
  overview,
  category,
  goods,
  chat,
  list,
  department,
  menu,
  role,
  user
} as Record<string, () => Promise<typeof import("*.vue")>>;

/**
 * 根据菜单生成路由对象
 * @param menus
 * @returns
 */
export const mapMenus = (menus: RoleMenuType[]): RouteRecordRaw[] => {
  const routes: RouteRecordRaw[] = [];
  // 1.先加载所有的routes
  const allRoutes: RouteRecordRaw[] = [];
  // 1.1 使用webpack函数获取route文件名称
  const routeFiles = require.context("../router/main", true, /\.ts/);
  routeFiles
    .keys()
    .forEach((k) =>
      allRoutes.push(require("../router/main" + k.substring(1)).default)
    );

  // 2.根据菜单添加需要的route,递归
  const recurseGetRoute = (
    menus: RoleMenuType[] | RoleSecondLevelMenu[] | RoleThreeLevelMenu[]
  ) => {
    for (const t of menus) {
      if (t.type === 2) {
        const route = allRoutes.find((route) => route.path === t.url);
        !route || routes.push(route);
      } else if (t.children) recurseGetRoute(t.children);
    }
  };

  recurseGetRoute(menus);

  return routes;
};

/**
 * 根据菜单生成路由对象
 * @param menus
 * @returns
 */
export const newMapMenus = (menus: RoleMenuType[]): RouteRecordRaw[] => {
  const routes: RouteRecordRaw[] = [];

  // 递归
  const recurseGetRoute = (
    menus: RoleMenuType[] | RoleSecondLevelMenu[] | RoleThreeLevelMenu[]
  ) => {
    for (const t of menus) {
      if (t.type === 2) {
        const nameArr = t.url?.split("/");
        if (!nameArr || !nameArr.length) continue;
        const name = nameArr[nameArr?.length - 1];
        const route: RouteRecordRaw = {
          path: t.url ?? "/not-found",
          name,
          component: vueComponents[name],
          children: []
        };
        routes.push(route);
      } else if (t.children) recurseGetRoute(t.children);
    }
  };

  recurseGetRoute(menus);

  routes.push({
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("@/views/not-found/NotFound.vue")
  });

  return routes;
};
