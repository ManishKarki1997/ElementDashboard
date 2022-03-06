<template>
  <div class="profile__main__page">
    <div class="products__grid">
      <ProductCard
        v-for="(product, idx) in products"
        :key="product.id"
        :product="product"
        :idx="idx"
        :disableAnimation="false"
      />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    ProductCard: () => import("@/components/Product/ProductCard"),
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    generateProducts(amount = 8) {
      const tempProducts = Array.from(Array(amount).keys()).map((idx) => ({
        id: "product-" + idx,
        category: "Pirates",
        productName: "Product Name",
        price: Math.round(Math.random() * 150),
        views: (Math.random() * 30).toFixed(2),
        ratings: parseInt((Math.random() * 4).toFixed(1)),
        productImage: `https://picsum.photos/seed/${idx}/500/500`,
        sellerImage: `https://avatars.dicebear.com/api/adventurer/${
          2000 - idx
        }.svg`,
      }));

      if (this.products.length === 0) {
        this.products = tempProducts;
      } else {
        this.products = [...this.products, ...tempProducts];
      }

      this.products.unshift({
        id: "product-one-piece",
        category: "Pirates",
        productName: "Ace, Sabo, Luffy by the cliff",
        price: 2550,
        views: 21.5,
        ratings: 4.6,
        productImage: `https://images5.alphacoders.com/605/thumb-1920-605588.jpg`,
        sellerImage: `https://images6.alphacoders.com/911/thumb-1920-911401.jpg`,
      });
    },
  },
  mounted() {
    this.generateProducts();
  },
};
</script>

<style lang="scss" scoped>
.products__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem 1rem;
}
</style>
