import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import cache from "@/utils/cache";

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

// router.beforeEach((to, from, next) => {
//   if (to.path === "/login") return next();
//   const token = cache.getCache("token");
//   token ? next() : next("/login");
// });

export { router as default };
