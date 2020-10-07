import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue"),
  },
  {
    path: "/demo1",
    name: "Demo1",
    component: () => import("@/views/Demo1.vue"),
  },
  {
    path: "/management",
    name: "Management",
    component: () => import("@/views/Management.vue"),
  },
  {
    path: "/validation",
    name: "Validation",
    component: () => import("@/views/Validation.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
