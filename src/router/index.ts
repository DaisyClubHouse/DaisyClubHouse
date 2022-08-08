import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/hall/Home.vue"),
    },
    {
      path: "/play",
      name: "play",
      component: () => import("../views/Play.vue"),
    },
  ],
});

export default router;
