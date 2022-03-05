<template>
  <el-menu
    default-active="2"
    class="dashboard__sidebar"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapsed"
  >
    <el-menu-item class="brand__info__item">
      <div class="brand__info">
        <img
          class="brand-logo"
          src="@/assets/images/luffy chibi.png"
          alt="Brand Logo"
        />
        <div class="info">
          <h1 class="brand__title">Luffy</h1>
          <p class="brand__subtitle">Strawhat Pirates</p>
        </div>
      </div>
    </el-menu-item>

    <router-link
      to="/app"
      custom
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <el-menu-item
        :class="[
          isActive && 'router-link-active',
          isExactActive && 'router-link-exact-active is-active',
        ]"
        active-class="is-active"
        :href="href"
        @click="navigate"
      >
        <i class="el-icon-menu"></i>
        <span>Dashboard</span>
      </el-menu-item>
    </router-link>

    <router-link
      to="/app/users"
      custom
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <el-menu-item
        :class="[
          isActive && 'router-link-active is-active',
          isExactActive && 'router-link-exact-active',
        ]"
        active-class="is-active"
        :href="href"
        @click="navigate"
      >
        <i class="el-icon-user"></i>
        <span>Users</span>
      </el-menu-item>
    </router-link>

    <router-link
      to="/app/settings"
      custom
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <el-menu-item
        :class="[
          isActive && 'router-link-active is-active',
          isExactActive && 'router-link-exact-active',
        ]"
        active-class="is-active"
        :href="href"
        @click="navigate"
      >
        <i class="el-icon-setting"></i>
        <span>Settings</span>
      </el-menu-item>
    </router-link>

    <el-menu-item
      class="sidebar__toggle__btn"
      @click="isCollapsed = !isCollapsed"
      index="4"
    >
      <i
        :class="[
          isCollapsed ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left',
        ]"
      ></i>
      <!-- <span slot="title">Toggle Collapse</span> -->
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
