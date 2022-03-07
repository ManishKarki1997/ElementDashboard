<template>
  <div class="dashboard__page dashboard__all__blogs">
    <BlogGrid />
  </div>
</template>

<script>
export default {
  components: {
    BlogGrid: () => import("@/components/Blogs/BlogGrid"),
  },
};
</script>

<style></style>
