import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import cache from "@/utils/cache";
import store from "@/store";
import { RoleMenuType } from "@/api/login";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/Login.vue")
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/Main.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("@/views/not-found/NotFound.vue")
  }
];

const router = createRouter({
  routes,
  history: createWebHashHistory()
});

// 全局前置守卫
router.beforeEach((to) => {
  const token = cache.getCache("token");
  if (to.path !== "/login" && !token) return "/login";
});

export { router as default };
