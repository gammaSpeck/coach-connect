import { RouteRecordRaw } from "vue-router";

const UserAuth = () => import("@/pages/auth/UserAuth.vue");

export const authRoutes: Array<RouteRecordRaw> = [
  { path: "/auth", component: UserAuth, meta: { requiresUnAuth: true } }
];
