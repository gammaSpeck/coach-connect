import { RouteRecordRaw } from "vue-router";

import CoachesList from "@/pages/coaches/CoachesList.vue";

const CoachDetails = () => import("@/pages/coaches/CoachDetails.vue");
const CoachRegistration = () => import("@/pages/coaches/CoachRegistration.vue");
const ContactCoach = () => import("@/pages/requests/ContactCoach.vue");

export const coachRoutes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/coaches" },
  { path: "/coaches", component: CoachesList },
  {
    path: "/coaches/:id",
    component: CoachDetails,
    props: true, // Passes Route Params as Props for
    children: [
      {
        path: "contact",
        component: ContactCoach
      }
    ]
  },
  { path: "/register", component: CoachRegistration, meta: { requiresAuth: true } }
];
