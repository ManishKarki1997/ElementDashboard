<template>
  <el-menu
    default-active="2"
    class="dashboard__sidebar"
    :collapse="isCollapsed"
  >
    <el-menu-item class="brand__info__item">
      <div @click="$router.push('/app/profile/starscream')" class="brand__info">
        <img
          class="brand-logo"
          src="@/assets/images/luffy chibi.png"
          alt="Brand Logo"
        />
        <div class="info">
          <h1 class="brand__title">Luffy</h1>
          <p class="brand__subtitle small__secondary">Dashboard Template</p>
        </div>
      </div>
    </el-menu-item>

    <router-link
      v-for="(sidebarLink, linkIdx) in sidebarLinks"
      :key="sidebarLink.name + '-' + linkIdx"
      :to="sidebarLink.path"
      custom
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <el-menu-item
        v-if="sidebarLink.subMenu === undefined"
        :class="[
          isActive && 'router-link-active ',
          isExactActive && 'router-link-exact-active is-active',
        ]"
        active-class="is-active"
        :href="href"
        @click="navigate"
      >
        <i :class="sidebarLink.iconName"></i>
        <span>{{ sidebarLink.name }}</span>
      </el-menu-item>

      <el-submenu
        v-else
        :index="(linkIdx + 1).toString()"
        class="sidebar-subment"
      >
        <template slot="title">
          <i :class="sidebarLink.iconName"></i>
          <span> {{ sidebarLink.name }}</span>
        </template>

        <router-link
          v-for="(submenuLink, subIdx) in sidebarLink.subMenu"
          :key="'submenu-' + subIdx + '-' + submenuLink.name"
          :index="`${(linkIdx + 1).toString()}-${(subIdx + 1).toString()}`"
          :to="submenuLink.path"
          custom
          v-slot="{ href, navigate, isActive, isExactActive }"
        >
          <el-menu-item
            :class="[
              isActive && 'router-link-active ',
              isExactActive && 'router-link-exact-active is-active',
            ]"
            active-class="is-active"
            :href="href"
            @click="navigate"
          >
            <i :class="submenuLink.iconName"></i>
            <span>{{ submenuLink.name }} </span>
          </el-menu-item>
        </router-link>
      </el-submenu>
    </router-link>

    <el-menu-item index="100" class="sidebar__buttons__row">
      <el-button class="sidebar__toggle__btn" @click="toggleDarkMode">
        <i
          :class="[isDarkMode ? 'el-icon-sunrise-1' : 'el-icon-moon-night']"
        ></i>
      </el-button>
      <el-button
        class="sidebar__toggle__btn"
        @click="isCollapsed = !isCollapsed"
      >
        <i
          :class="[
            isCollapsed ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left',
          ]"
        ></i>
      </el-button>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false,
      isDarkMode: false,
      sidebarLinks: [
        {
          name: "Dashboard",
          iconName: "el-icon-menu",
          path: "/app",
        },
        {
          name: "Profile",
          iconName: "el-icon-user",
          path: "/app/profile/starscream",
        },
        {
          name: "Users",
          iconName: "el-icon-user",
          path: "/app/users",
          subMenu: [
            {
              name: "Admins",
              iconName: "el-icon-user",
              path: "/app/users?role=admin",
            },
            {
              name: "Worckers",
              iconName: "el-icon-user",
              path: "/app/users?role=worcker",
            },
            {
              name: "Independent Hirers",
              iconName: "el-icon-user",
              path: "/app/users?role=independent-hirer",
            },
            {
              name: "Organization Hirers",
              iconName: "el-icon-user",
              path: "/app/users?role=organization-hirer",
            },
          ],
        },
        {
          name: "Gigs",
          iconName: "el-icon-box",
          path: "/app/gigs",
          subMenu: [
            {
              name: "Create New Gig",
              iconName: "el-icon-circle-plus-outline",
              path: "/app/gigs/create/gig-overview",
            },
            {
              name: "All Gigs",
              iconName: "el-icon-box",
              path: "/app/gigs?status=all",
            },
            {
              name: "Verified Gigs",
              iconName: "el-icon-box",
              path: "/app/gigs?status=verified",
            },
            {
              name: "Unverified Gigs",
              iconName: "el-icon-box",
              path: "/app/gigs?status=unverified",
            },
          ],
        },
        {
          name: "Orders",
          iconName: "el-icon-shopping-cart-full",
          path: "/app/orders",
          subMenu: [
            {
              name: "All Orders",
              iconName: "el-icon-shopping-cart-full",
              path: "/app/orders?status=all",
            },
            {
              name: "Completed Orders",
              iconName: "el-icon-shopping-cart-full",
              path: "/app/orders?status=completed",
            },
            {
              name: "Cancelled Orders",
              iconName: "el-icon-shopping-cart-full",
              path: "/app/orders?status=cancelled",
            },
            {
              name: "Unresponded Orders",
              iconName: "el-icon-shopping-cart-full",
              path: "/app/orders?status=unresponded",
            },
          ],
        },
        {
          name: "Blogs",
          iconName: "el-icon-reading",
          path: "/app/blogs",
          subMenu: [
            {
              name: "Add New Blog",
              iconName: "el-icon-circle-plus-outline",
              path: "/app/blogs/add",
            },
            {
              name: "All Blogs",
              iconName: "el-icon-reading",
              path: "/app/blogs",
            },
            {
              name: "Blog Categories",
              iconName: "el-icon-news",
              path: "/app/blogs/categories",
            },
          ],
        },
        {
          name: "Milestones",
          iconName: "el-icon-ice-cream-square",
          path: "/app/milestones",
          subMenu: [
            {
              name: "Ongoing Milestones",
              iconName: "el-icon-ice-cream-square",
              path: "/app/milestones?type=ongoing-milestones",
            },
            {
              name: "Deposit Pending",
              iconName: "el-icon-ice-cream-square",
              path: "/app/milestones/?type=deposit-pending",
            },
          ],
        },
        {
          name: "Custom Order Requests",
          iconName: "el-icon-odometer",
          path: "/app/custom-order-requests",
        },
        {
          name: "Settings",
          iconName: "el-icon-setting",
          path: "/app/settings",
        },
      ],
    };
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      this.setThemeClass(this.isDarkMode);
      localStorage.setItem(
        "ELEMENT_DASHBOARD_THEME",
        this.isDarkMode ? "dark" : "light"
      );
    },
    setThemeClass(isThemeDark) {
      if (isThemeDark) {
        document.body.classList.remove("theme--light");
        document.body.classList.add("theme--dark");
      } else {
        document.body.classList.remove("theme--dark");
        document.body.classList.add("theme--light");
      }
    },
  },
  mounted() {
    const lsTheme = localStorage.getItem("ELEMENT_DASHBOARD_THEME");
    this.isDarkMode = !lsTheme ? false : lsTheme === "dark" ? true : false;

    this.setThemeClass(this.isDarkMode);
  },
};
</script>
