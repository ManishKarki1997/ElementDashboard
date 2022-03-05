<template>
  <div class="profile__main__page">
    <div class="block__header">
      <div class="header__left">
        <h3>Reviews</h3>
        <p class="small__secondary">All reviews left by Nico Robin</p>
      </div>

      <div class="header__right">
        <el-button type="primary" size="small" class="custom__btn__with__icon">
          <font-awesome-icon :icon="['fas', 'plus']"></font-awesome-icon>
          <span> Add Review </span>
        </el-button>
      </div>
    </div>

    <div class="reviews__grid">
      <ReviewCard
        v-for="(review, idx) in reviews"
        :key="review.id"
        :review="review"
        :idx="idx"
        :disableAnimation="false"
      />
    </div>

    <LoadMoreButton
      @loadMore="handleLoadMoreData"
      :loading="isLoadingMoreData"
    />
  </div>
</template>

<script>
export default {
  components: {
    ReviewCard: () => import("@/components/Reviews/ReviewCard"),
    LoadMoreButton: () => import("@/components/Common/LoadMoreButton"),
  },
  data() {
    return {
      isLoadingMoreData: false,
      reviews: [],
    };
  },
  methods: {
    handleLoadMoreData() {
      this.isLoadingMoreData = true;

      setTimeout(() => {
        this.generateReviews();
        this.isLoadingMoreData = false;
      }, 1000);
    },
    generateReviews(amount = 9) {
      Array.from(Array(amount).keys()).forEach((idx) => {
        this.reviews.push({
          id: "review-" + this.reviews.length + idx,
          userName: "Nico Robin",
          userImage: `https://picsum.photos/seed/${this.reviews.length}-${idx}/500/500`,
          date: `Jan ${(idx + 1) % 30}, 2020`,
          review: ` A wonderful serenity has taken possession of my entire soul, like these
      sweet mornings of spring which I enjoy with my whole heart. I am alone,
      and feel the charm of existence in this spot, which was created for the
      bliss of souls like mine.`,
          rating: parseFloat((Math.random() * 4 + 1).toFixed(1)),
        });
      });
    },
  },
  mounted() {
    this.generateReviews();
  },
};
</script>

<style lang="scss" scoped>
.block__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: $spacing-1;
  margin-bottom: $spacing-2;
  padding: 1rem;
  @include themed() {
    background-color: t($bg-secondary);
  }
}

.reviews__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
</style>
