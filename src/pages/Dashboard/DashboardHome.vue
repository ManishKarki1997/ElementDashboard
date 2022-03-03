<template>
  <div class="dashboard__page dashboard-index">
    <DashboardStat />
  </div>
</template>

<script>
export default {
  components: {
    DashboardStat: () => import("@/components/Dashboard/DashboardStat"),
  },
};
</script>

<style></style>
