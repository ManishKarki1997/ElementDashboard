<template>
  <el-menu
    default-active="2"
    class="dashboard-sidebar"
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

    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">Dashboard</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-setting"></i>
      <span slot="title">Projecs</span>
    </el-menu-item>

    <el-menu-item @click="isCollapsed = !isCollapsed" index="4">
      <i
        :class="[
          isCollapsed ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left',
        ]"
      ></i>
      <span slot="title">Toggle Collapse</span>
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
.el-menu-item:not(.brand__info__item) {
  height: 40px;
  margin-bottom: 12px;
  padding-block: 1.2rem;
  display: flex !important;
  align-items: center !important;
  border-radius: 5px;
}

.el-menu-item.brand__info__item {
  padding: 0 8px;
  width: 100%;
  padding-left: 8px !important;
}
.dashboard-sidebar {
  @include themed() {
    background: t($bg-secondary);
  }
}
.dashboard-sidebar:not(.el-menu--collapse) {
  width: 300px;
  height: 100vh;

  .brand__info {
    .info {
      display: block;
      & > * {
        line-height: 1.6;
      }
    }
  }
}

.el-menu-item {
  max-width: 85%;
  margin-inline: auto;
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
.dashboard-sidebar .el-menu-item:not(.brand__info__item) {
  .el-tooltip {
    display: flex !important;
    align-items: center !important;
    justify-content: center;
  }
}
</style>
