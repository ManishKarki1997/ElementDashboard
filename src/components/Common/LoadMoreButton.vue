<template>
  <div class="load__more__wrapper">
    <el-button
      @click="onClickLoadMoreBtn"
      :loading="loading"
      class="load__more__btn"
      type="primary"
      icon="el-icon-refresh-left
"
    >
      {{ loading ? "Loading" : "Load More" }}
    </el-button>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    onClickLoadMoreBtn() {
      this.$emit("loadMore");
    },
  },
};
</script>

<style scoped lang="scss">
.load__more__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-block: $spacing-4;
}
</style>
