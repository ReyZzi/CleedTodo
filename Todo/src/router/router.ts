import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import AddTodos from "../views/AddTodos.vue";
import NotFound from "../views/NotFound.vue";
import ViewTodos from "../views/ViewTodos.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/add",
    name: "AddTodos",
    component: AddTodos,
  },
  {
    path: "/view",
    name: "ViewTodos",
    component: ViewTodos,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
