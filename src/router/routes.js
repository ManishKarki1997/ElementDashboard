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
        path: "/app/products",
        name: "Dashboard Products",
        meta: {
          name: "Products",
        },
        component: () =>
          import(
            /* webpackChunkName: "Dashboard Products" */ "../pages/Dashboard/DashboardProducts"
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
      {
        path: "/app/profile/:userId",
        name: "User Profile",
        meta: {
          name: "Profile",
        },
        component: () =>
          import(
            /* webpackChunkName: "User Profile" */ "../pages/Dashboard/Profile/Profile"
          ),
        children: [
          {
            path: "/app/profile/:userId",
            name: "User Profile Details",
            meta: {
              name: "Basic Info",
            },
            component: () =>
              import(
                /* webpackChunkName: "User Profile" */ "../pages/Dashboard/Profile/BasicInfo"
              ),
          },
          {
            path: "/app/profile/:userId/listed-products",
            name: "User Profile Listed Products",
            meta: {
              name: "Listed Products",
            },
            component: () =>
              import(
                /* webpackChunkName: "User Profile Listed Products" */ "../pages/Dashboard/Profile/ListedProducts"
              ),
          },
          {
            path: "/app/profile/:userId/reviews",
            name: "User Profile Reviews",
            meta: {
              name: "Reviews",
            },
            component: () =>
              import(
                /* webpackChunkName: "User Profile Reviews" */ "../pages/Dashboard/Profile/Reviews"
              ),
          },
          {
            path: "/app/profile/:userId/notifications",
            name: "User Profile Notifications",
            meta: {
              name: "Notifications",
            },
            component: () =>
              import(
                /* webpackChunkName: "User Profile Notifications" */ "../pages/Dashboard/Profile/Notifications"
              ),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    redirect: "/",
  },
];
