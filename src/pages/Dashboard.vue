<template>
  <div class="dashboard-home">
    <Sidebar />
    <div class="dashboard__body">
      <DashboardHeader />
      <main class="dashboard__body-content">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Sidebar: () => import("@/components/Dashboard/Sidebar"),
    DashboardHeader: () => import("@/components/Dashboard/DashboardHeader"),
  },
};
</script>

<style scoped lang="scss">
.dashboard-home {
  min-height: 100vh;
  display: flex;

  .dashboard__body {
    min-height: 100vh;
    width: 100%;
  }
  .dashboard__body-content {
    padding: 1rem;
    width: 100%;
  }
}
</style>
