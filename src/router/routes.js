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
    component: () =>
      import(/* webpackChunkName: "Dashboard" */ "../pages/Dashboard"),
    children: [
      {
        path: "/app",
        name: "Dashboard Home",
        meta: {
          name: "Dashboard",
        },
        component: () =>
          import(
            /* webpackChunkName: "Dashboard Home" */ "../pages/Dashboard/DashboardHome"
          ),
      },
      {
        path: "/app/users",
        name: "Dashboard Users",
        meta: {
          name: "Users",
        },
        component: () =>
          import(
            /* webpackChunkName: "Dashboard Users" */ "../pages/Dashboard/DashboardUsers"
          ),
      },
      {
        path: "/app/settings",
        name: "Dashboard Settings",
        meta: {
          name: "Settings",
        },
        component: () =>
          import(
            /* webpackChunkName: "Dashboard Settings" */ "../pages/Dashboard/DashboardSettings"
          ),
      },
    ],
  },
  {
    path: "*",
    redirect: "/",
  },
];
