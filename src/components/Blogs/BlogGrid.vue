<template>
  <div class="blog__grid">
    <BlogCard
      v-for="i in 6"
      :key="'blog-card-' + i"
      :type="i % 2 === 0 ? 'overlay' : ''"
    />
  </div>
</template>

<script>
export default {
  components: {
    BlogCard: () => import("@/components/Blogs/BlogCard"),
  },
};
</script>

<style scoped lang="scss">
.blog__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 4rem 2rem;
}
</style>
