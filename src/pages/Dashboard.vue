<template>
  <div class="dashboard-home">
    <Sidebar />
    <h4>Home</h4>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ipsa
      cumque totam nostrum quam et quibusdam impedit minus ducimus unde?
    </p>
  </div>
</template>

<script>
export default {
  components: {
    Sidebar: () => import("@/components/Dashboard/Sidebar"),
  },
};
</script>

<style scoped>
.dashboard-home {
  min-height: 100vh;
  display: flex;
}
</style>
