<template>
  <div
    v-animate-css="animationObj"
    :class="{ isInWishlist }"
    class="product__card"
  >
    <div class="product__backdrop">
      <img :src="product.productImage" alt="Product Image" />
      <div class="overlay"></div>

      <el-button
        :class="{ active: isInWishlist }"
        @click="toggleWishlist"
        class="icon__button heart__button"
      >
        <font-awesome-icon size="lg" :icon="['fas', 'heart']" />
      </el-button>
    </div>

    <div class="product__content">
      <div class="product__seller__info">
        <el-avatar
          shape="circle"
          :size="56"
          fit="cover"
          :src="product.sellerImage"
        ></el-avatar>
      </div>

      <p class="subtitle small__secondary">{{ product.categoryName }}</p>
      <div class="product__name__wrapper">
        <h4 class="product__name">{{ product.productName }}</h4>

        <el-dropdown
          @command="handleDropdownCommand"
          trigger="click"
          placement="bottom-end"
        >
          <button>
            <font-awesome-icon :icon="['fas', 'ellipsis-h']" />
          </button>

          <el-dropdown-menu
            class="has-bg has-shadow has-no-padding-block"
            slot="dropdown"
          >
            <el-dropdown-item
              :command="productDropdownCommands.ADD_TO_CART"
              class="c__icon__dropdown__item"
              :class="{ isInCart }"
            >
              <font-awesome-icon :icon="['fas', 'shopping-basket']" />

              <span>{{ isInCart ? "Remove from Cart" : "Add To Cart" }}</span>
            </el-dropdown-item>

            <el-dropdown-item
              :command="productDropdownCommands.VIEW_PRODUCT"
              class="c__icon__dropdown__item"
            >
              <font-awesome-icon :icon="['far', 'square']" />
              <span> View Product </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="product__pricing">
        <h2>${{ product.price }}</h2>
      </div>

      <div class="product__meta__info horizontal__center gap-8">
        <div class="icon__item">
          <font-awesome-icon :icon="['far', 'eye']" />

          <p class="views">{{ product.views }}k</p>
        </div>
        <div class="icon__item">
          <p class="bullet">&bull;</p>
        </div>
        <div class="icon__item">
          <font-awesome-icon :icon="['far', 'star']" />
          <p class="review__count">{{ product.ratings }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    idx: {
      type: Number,
      default: 0,
    },
    product: {
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
  data() {
    return {
      isInWishlist: false,
      isInCart: false,
      productDropdownCommands: {
        ADD_TO_CART: "ADD_TO_CART",
      },
    };
  },
  methods: {
    toggleWishlist() {
      this.isInWishlist = !this.isInWishlist;
    },
    toggleCart() {
      this.isInCart = !this.isInCart;
    },
    handleDropdownCommand(command) {
      if (command === this.productDropdownCommands.ADD_TO_CART) {
        this.toggleCart();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.product__card {
  width: 100%;
  max-width: 350px;

  @include radius();
  @include themed() {
    background-color: t($bg-secondary);
  }

  &.isInWishlist {
    .heart__button {
      visibility: visible !important;
    }
  }

  &:hover {
    @include box-shadow($shadow);
    .heart__button {
      visibility: visible !important;
    }
  }

  .product__backdrop {
    width: 100%;
    height: 200px;
    border-radius: 5px 5px 0 0;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .heart__button {
      position: absolute;
      top: 1rem;
      right: 1rem;
      border: none;
      background-color: #808191a6;
      border-radius: 50%;
      width: 30px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.938);
      visibility: hidden;

      &:hover {
        background-color: $danger-color;
      }

      &.active {
        background-color: $danger-color;
      }

      &.active:hover {
        background-color: #808191a6;
      }
    }
  }

  .product__content {
    padding: 1rem;
    position: relative;
    @include radius();

    .product__seller__info {
      position: absolute;
      right: 12px;
      top: -2rem;
      z-index: 100;

      .el-avatar {
        cursor: pointer;
        border: 2px solid white;
      }
    }

    .product__name__wrapper {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-top: $spacing-2;
      margin-bottom: $spacing-8px;
    }

    .product__name {
      font-weight: 400;
      font-size: 1.1rem;
    }

    .product__pricing {
      margin-bottom: $spacing-1;

      h2 {
        color: $danger-color;
      }
    }

    .product__meta__info {
      display: flex;
      align-items: center;
    }
    .icon__item {
      display: flex;
      align-items: center;
      gap: 4px;

      p {
        font-size: 0.8rem;
        @include themed() {
          color: t($text-secondary);
        }
      }
      svg {
        width: 0.9rem;
        height: 0.9rem;
        @include themed() {
          color: t($text-secondary);
        }
      }

      &:nth-child(3) {
        svg {
          margin-top: -2px;
        }
      }
    }
  }
}
</style>
