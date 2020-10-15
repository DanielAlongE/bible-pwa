import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Offline from "../views/Offline.vue"

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/settings",
    name: "Settings",
    component: () =>
      import("../views/Settings.vue")
  },
  {
    path: "/404",
    name: "404",
    component: Offline
  },
  {
    path: "/offline",
    name: "Offline",
    component: Offline
  },
];

const router = new VueRouter({
  routes
});

export default router;
