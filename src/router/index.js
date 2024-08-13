import { createWebHistory, createRouter } from "vue-router";
import SingleLayout from "..//Layouts/SingleLayout.vue";
import MainLayout from "@/Layouts/MainLayout.vue";

export const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/HomePage/HomePage.vue"),
    meta: { layout: MainLayout, requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/LoginPages.vue"),
    meta: { layout: SingleLayout, requireAuth: false },
  },
  {
    path: "/logout",
    name: "Logout",
    component: () => import("../pages/LogoutPages.vue"),
    meta: { layout: SingleLayout, requireAuth: false },
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("../pages/Test/TestPage.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/employee",
    name: "Employee",
    component: () => import("../pages/Employee/EmployeePage.vue"),
    meta: { layout: MainLayout, requiresAuth: true },
  },
  {
    path: "/employee/:id",
    name: "employee-detail",
    component: () => import("../pages/Employee/EmployeeDetail.vue"),
    meta: { layout: MainLayout, requiresAuth: true },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
