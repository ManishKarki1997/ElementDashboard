<template>
  <el-menu
    default-active="2"
    class="dashboard__sidebar"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapsed"
  >
    <el-menu-item index="1" class="brand__info__item">
      <div class="brand__info">
        <img
          class="brand-logo"
          src="@/assets/images/luffy chibi.png"
          alt="Brand Logo"
        />
        <div class="info">
          <h4 class="brand__title">Luffy</h4>
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

<style scoped lang="scss">
.dashboard__sidebar.el-menu {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0 8px;
}
.el-menu-item:not(.brand__info__item) {
  height: 40px;
  margin-bottom: 12px;
  padding-left: 0;
  padding: 1.2rem 1rem 1.2rem 8px;
  display: flex !important;
  align-items: center !important;
  border-radius: 5px;
  width: 100%;
}

.el-menu-item {
  padding-left: 14px !important;
}

.el-menu-item.brand__info__item {
  padding: 0 8px;
  width: 100%;
  padding-left: 8px !important;
}
.dashboard__sidebar {
  @include themed() {
    background: t($bg-secondary);
  }
}
.dashboard__sidebar:not(.el-menu--collapse) {
  /* min-width: 300px; */
  width: 300px;
  max-width: 300px;
  height: 100vh;
  padding: 0 1rem;

  .brand__info {
    .info {
      display: block;
      & > * {
        line-height: 1.6;
      }
    }
  }
}

.el-menu-item.sidebar__toggle__btn {
  margin-top: auto;
  max-width: 50px;
  width: max-content;
  margin-left: auto;
  @include themed() {
    background: t($bg-primary);
  }
}
.el-menu-item.sidebar__toggle__btn.is-active {
  @include themed() {
    background: t($bg-primary) !important;
    color: t($text-primary) !important;
  }
}

.el-menu-item.brand__info__item {
  max-width: 95%;
}

.brand__info__item {
  margin-bottom: 4rem;
}

.brand__info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 1rem 0;

  .brand-logo {
    width: 50px;
    height: 50px;
    object-fit: cover;
    /* margin: 0 auto; */
  }

  .info {
    display: none;
  }
}

.el-menu-item.is-active {
  @include themed() {
    background-color: t($link-primary) !important;
    color: white;
  }
}
</style>

<style lang="scss">
.dashboard__sidebar .el-menu-item:not(.brand__info__item) {
  .el-tooltip {
    display: flex !important;
    align-items: center !important;
    justify-content: center;
  }
}
</style>
