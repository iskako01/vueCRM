import { createRouter, createWebHistory } from "vue-router";
import { firebase, auth } from "../firebase";

const routes = [
  {
    path: "/login",
    name: "login",
    meta: { layout: "empty" },
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: { layout: "empty" },
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
    meta: { layout: "main", auth: true },
  },
  {
    path: "/categories",
    name: "categories",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Categories.vue"),
  },
  {
    path: "/history",
    name: "history",
    meta: { layout: "main", auth: true },
    component: () => import("../views/History.vue"),
  },
  {
    path: "/planning",
    name: "planning",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Planning.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/record",
    name: "record",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Record.vue"),
  },
  {
    path: "/detail/:id",
    name: "detail",
    props: true,
    meta: { layout: "main", auth: true },
    component: () => import("../views/Detail.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});
router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser;
  const requireAuth = to.meta.auth;

  if (requireAuth && !currentUser) {
    next("/login?messages=login");
  } else {
    next();
  }
});

export default router;
