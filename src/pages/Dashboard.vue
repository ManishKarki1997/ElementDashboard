<template>
  <div class="dashboard-home">
    <Sidebar />
    <div class="dashboard__body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Sidebar: () => import("@/components/Dashboard/Sidebar"),
  },
};
</script>

<style scoped lang="scss">
.dashboard-home {
  min-height: 100vh;
  display: flex;

  .dashboard__body {
    padding: 1rem;
  }
}
</style>
