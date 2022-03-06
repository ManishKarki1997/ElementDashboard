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
        path: "/app/gigs",
        meta: {
          name: "Gigs",
        },
        component: () =>
          import(
            /* webpackChunkName: "Dashboard Gigs" */ "../pages/Dashboard/Gigs/DashboardGigs"
          ),
      },
      {
        path: "/app/gigs/create",
        meta: {
          name: "Create Gig",
        },
        redirect: "/app/gigs/create/gig-overview",
        component: () =>
          import(
            /* webpackChunkName: "Create Gig" */ "../pages/Dashboard/Gigs/CreateGig"
          ),
        children: [
          {
            path: "/app/gigs/create/gig-overview",
            meta: {
              name: "Create Gig | Overview",
              step: 1,
            },
            component: () =>
              import(
                /* webpackChunkName: "Create Gig Overview" */ "../pages/Dashboard/Gigs/CreateGigOverview"
              ),
          },
          {
            path: "/app/gigs/create/gig-pricing",
            meta: {
              name: "Create Gig | Pricing",
              step: 2,
            },
            component: () =>
              import(
                /* webpackChunkName: "Create Gig Pricing" */ "../pages/Dashboard/Gigs/CreateGigPricing"
              ),
          },
          {
            path: "/app/gigs/create/gig-gallery",
            meta: {
              name: "Create Gig | Gallery",
              step: 3,
            },
            component: () =>
              import(
                /* webpackChunkName: "Create Gig Galery" */ "../pages/Dashboard/Gigs/CreateGigGallery"
              ),
          },
        ],
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
