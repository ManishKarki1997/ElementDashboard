<template>
  <div class="dashboard__page dashboard-settings">
    <FiltersHeader
      :activeViewTab="activeViewTab"
      :filters="productFilters"
      :filtersForm="filtersForm"
      @ITEM_VIEW_TAB_ACTIVE="onActiveViewTabSelected"
    />

    <template v-if="activeViewTab === 'GRID'">
      <div class="products__grid">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
      <LoadMoreButton
        @loadMore="handleLoadMoreData"
        :loading="isLoadingMoreData"
      />
    </template>

    <template v-if="activeViewTab === 'TABLE'">
      <div class="table__wrapper">
        <el-table :data="paginatedProductsData" style="width: 100%">
          <el-table-column prop="productName" label="Product" width="300">
            <template slot-scope="scope">
              <div class="horizontal__center gap-8">
                <el-avatar
                  shape="square"
                  size="large"
                  :src="scope.row.productImage"
                ></el-avatar>

                <h4>{{ scope.row.productName }}</h4>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="price" label="Price">
            <template slot-scope="scope">
              <h5>{{ scope.row.price }}</h5>
            </template>
          </el-table-column>

          <el-table-column prop="views" label="Views">
            <template slot-scope="scope">
              <div class="horizontal__center gap-4">
                <font-awesome-icon :icon="['far', 'eye']" />

                <p class="views">{{ scope.row.views }}k</p>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="rating" label="Ratings" width="180">
            <template slot-scope="scope">
              <el-rate
                v-model="scope.row.ratings"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              >
              </el-rate>
            </template>
          </el-table-column>

          <el-table-column prop="iser" label="Seller" width="300">
            <template slot-scope="scope">
              <div class="horizontal__center gap-8">
                <el-avatar
                  shape="square"
                  size="large"
                  :src="scope.row.sellerImage"
                ></el-avatar>

                <h4>Jupiter</h4>
              </div>
            </template>
          </el-table-column>

          <el-table-column align="right">
            <template slot="header"> Actions </template>
            <template slot-scope="scope">
              <el-dropdown
                @command="handleDropdownCommand($event, scope.row)"
                trigger="click"
                placement="bottom-end"
              >
                <el-button size="mini" type="primary">Action</el-button>

                <el-dropdown-menu
                  class="has-bg has-shadow has-no-padding-block"
                  slot="dropdown"
                >
                  <el-dropdown-item
                    :command="productDropdownCommands.ADD_TO_CART"
                    class="c__icon__dropdown__item"
                  >
                    <font-awesome-icon :icon="['fas', 'shopping-basket']" />

                    <span>Add To Cart</span>
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
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          class="pagination"
          @current-change="onTablePageChange"
          background
          layout="prev, pager, next"
          :total="products.length"
        >
        </el-pagination>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  components: {
    ProductCard: () => import("@/components/Product/ProductCard"),
    FiltersHeader: () => import("@/components/Dashboard/FiltersHeader"),
    LoadMoreButton: () => import("@/components/Common/LoadMoreButton"),
  },
  data() {
    return {
      products: [],
      productFilters: [
        {
          formName: "name",
          name: "Name",
          options: [
            {
              label: "Ascending",
              value: "name:asc",
            },
            {
              label: "Descending",
              value: "name:desc",
            },
          ],
        },
        {
          formName: "price",
          name: "Price",
          options: [
            {
              label: "Highest to Lowest",
              value: "price:desc",
            },
            {
              label: "Lowest to Highest",
              value: "price:asc",
            },
          ],
        },
        {
          formName: "ratings",
          name: "Ratings",
          options: [
            {
              label: "Highest to Lowest",
              value: "rating:desc",
            },
            {
              label: "Lowest to Highest",
              value: "rating:asc",
            },
          ],
        },
      ],
      filtersForm: {
        name: "",
        price: "",
        ratings: "",
      },
      activeViewTab: "GRID",
      productsTablePaginationInfo: {
        activeTablePage: 1,
        pageSize: 10,
      },
      productDropdownCommands: {
        ADD_TO_CART: "ADD_TO_CART",
      },
      isLoadingMoreData: false,
    };
  },
  computed: {
    paginatedProductsData() {
      return this.products.slice(
        this.productsTablePaginationInfo.pageSize *
          this.productsTablePaginationInfo.activeTablePage -
          this.productsTablePaginationInfo.pageSize,

        this.productsTablePaginationInfo.pageSize *
          this.productsTablePaginationInfo.activeTablePage
      );
    },
  },
  methods: {
    onTablePageChange(page) {
      this.productsTablePaginationInfo.activeTablePage = page;
    },
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
    handleLoadMoreData() {
      this.isLoadingMoreData = true;

      setTimeout(() => {
        this.generateProducts(10);
        this.isLoadingMoreData = false;
      }, 1000);
    },
    onActiveViewTabSelected(selectedView) {
      this.activeViewTab = selectedView;
    },
    handleDropdownCommand(command) {
      if (command === this.productDropdownCommands.ADD_TO_CART) {
        console.log(command);
      }
    },
  },
  mounted() {
    this.generateProducts();
  },
};
</script>

<style scoped lang="scss">
.pagination {
  @include spacing($spacing-2, "margin-top");
}
.products__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem 1rem;
}
</style>
