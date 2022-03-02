export default [
  {
    path: "/",
    name: "Home",
    meta: {
      name: "Home",
    },
    component: () => import("../pages/Home"),
  },
  {
    path: "/app",
    name: "Dashboard",
    meta: {
      name: "Dashboard",
    },
    component: () => import("../pages/Dashboard"),
  },
  {
    path: "*",
    redirect: "/",
  },
];
