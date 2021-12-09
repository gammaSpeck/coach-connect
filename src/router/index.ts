import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { coachRoutes } from "./coach-routes";
import { requestRoutes } from "./request-routes";
import { authRoutes } from "./auth-routes";

import NotFound from "@/pages/NotFound.vue";
import { authModule } from "@/store";

const routes: Array<RouteRecordRaw> = [
  ...coachRoutes,
  ...requestRoutes,
  ...authRoutes,
  {
    path: "/:notFound(.*)",
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, _, next) => {
  const isAuth = authModule.isAuthenticated;

  if (to.meta.requiresAuth && !isAuth) return next("/auth");
  if (to.meta.requiresUnAuth && isAuth) return next("/coaches");

  next();
});

export default router;
