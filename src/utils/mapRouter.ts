import type {
  RoleMenuType,
  RoleSecondLevelMenu,
  RoleThreeLevelMenu
} from "@/api/login";
import type { RouteRecordRaw } from "vue-router";
export type MenuType = RoleMenuType | RoleSecondLevelMenu | RoleThreeLevelMenu;
export type BreadcrumbItem = System.Breadcrumb.ListItem;
// 二级菜单组件
const dashboard = () => import("@views/main/analysis/dashboard/Dashboard.vue");
const overview = () => import("@views/main/analysis/overview/Overview.vue");
const category = () => import("@views/main/product/category/Category.vue");
const goods = () => import("@views/main/product/goods/Goods.vue");
const chat = () => import("@views/main/story/chat/Chat.vue");
const list = () => import("@views/main/story/list/List.vue");
const department = () => import("@views/main/system/department/Department.vue");
const menu = () => import("@views/main/system/menu/Menu.vue");
const role = () => import("@/views/main/system/role/Role");
const user = () => import("@/views/main/system/user/User");

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
  const recurseGetRoute = (menus: MenuType[]) => {
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
  const recurseGetRoute = (menus: MenuType[]) => {
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

  return routes;
};

/**
 * 根据当前path获取到当前的菜单
 * @param menus 菜单数组
 * @param currentPath 当前路由地址
 * @param breadcrumbList 面包屑地址数组
 */
export const pathMapToMenu = (
  menus: MenuType[],
  currentPath: string,
  breadcrumbList?: BreadcrumbItem[]
): unknown => {
  for (const menu of menus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(
        menu.children ?? [],
        currentPath
      ) as MenuType;
      if (findMenu) {
        breadcrumbList?.push({ name: menu.name }, { name: findMenu.name });
        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === currentPath) return menu;
  }
};

/**
 * 根据当前path获取面包屑地址数组
 * @param menus 菜单数组
 * @param currentPath 当前路由地址
 */
export const pathMaptoBreadcrumb = (
  menus: MenuType[],
  currentPath: string
): BreadcrumbItem[] => {
  const breadcrumbList: BreadcrumbItem[] = [];
  pathMapToMenu(menus, currentPath, breadcrumbList);
  return breadcrumbList;
};
