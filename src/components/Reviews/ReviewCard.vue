<template>
  <div v-animate-css="animationObj" class="review__card">
    <div class="review__top">
      <div class="review__left">
        <el-avatar
          shape="circle"
          :size="60"
          fit="cover"
          :src="review.userImage"
        ></el-avatar>

        <div class="review__user">
          <h4 class="review__user__name">{{ review.userName }}</h4>
          <el-rate
            :value="review.rating"
            disabled
            show-score
            text-color="#F8AD3A"
            score-template="{value}"
          >
          </el-rate>
        </div>
      </div>

      <div class="review__right">
        <p class="review__date small__secondary">{{ review.date }}</p>
      </div>
    </div>

    <p class="review__message">
      {{ review.review }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    idx: {
      type: Number,
      default: 0,
    },
    review: {
      type: Object,
      required: true,
    },
    disableAnimation: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    animationObj() {
      if (this.disableAnimation) {
        return { classes: "" };
      } else {
        return { classes: "fadeInUp", delay: this.idx * 50, duration: 700 };
      }
    },
  },
};
</script>

<style scoped lang="scss">
.review__card {
  width: 100%;
  max-width: 500px;
  padding: 1rem;
  @include themed() {
    background-color: t($bg-secondary);
  }
  @include radius($large);
}
.review__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: $spacing-2;

  .review__left {
    display: flex;
    align-items: center;
    gap: $spacing-1;

    h4 {
      margin-bottom: $spacing-4px;
    }

    .review__user {
      .review__user__name {
        font-size: 1.1rem;
        font-weight: 400;
      }
    }
  }
}
.review__message {
  font-size: 0.9rem;
}
</style>
