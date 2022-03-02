export default [
  {
    path: "/",
    name: "Home",
    meta: {
      name: "Home",
    },
    component: () => import("../pages/Dashboard"),
    // component: () => import("../pages/Home"),
  },
  {
    path: "/app",
    name: "Dashboard",
    meta: {
      name: "Dashboard",
    },
    component: () => import("../pages/Home"),
    // component: () => import("../pages/Dashboard"),
  },
  {
    path: "*",
    redirect: "/",
  },
];
