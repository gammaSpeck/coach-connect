import { RouteRecordRaw } from "vue-router";

const RequestsReceived = () => import("@/pages/requests/RequestsReceived.vue");

export const requestRoutes: Array<RouteRecordRaw> = [
  { path: "/requests", component: RequestsReceived, meta: { requiresAuth: true } }
];
