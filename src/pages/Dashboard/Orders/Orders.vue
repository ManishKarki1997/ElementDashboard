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
        <div
          style="padding: 1rem"
          v-for="order in cardsOrders"
          :key="order._id"
        >
          <h4 v-if="order.package && order.package.title !== undefined">
            {{ order.package.title }}
          </h4>
          <h4 v-else>Placeholder</h4>
          <!-- <p>{{ order.package.description }}</p> -->
        </div>
        <!-- <ProductCard
          v-for="(gig, idx) in orders"
          :key="gig._id"
          :gig="gig"
          :idx="idx"
          :disableAnimation="false"
        /> -->
      </div>
      <LoadMoreButton
        v-if="cardsPaginationInfo.hasNext"
        @loadMore="handleLoadMore"
        :loading="isLoadingMoreData"
      />
    </template>

    <template v-if="activeViewTab === 'TABLE'">
      <div class="table__wrapper">
        <el-table
          v-loading="isLoading"
          :data="paginatedOrdersData"
          style="width: 100%"
        >
          <el-table-column prop="worcker" label="Worcker" width="300">
            <template slot-scope="scope">
              <div class="horizontal__center gap-8">
                <!-- <el-avatar
                  shape="square"
                  size="large"
                  :src="scope.row.productImage"
                ></el-avatar> -->
                <el-avatar
                  shape="square"
                  size="large"
                  :src="getAvatarLink(scope.row.worcker.avatar)"
                ></el-avatar>

                <h4>
                  {{ scope.row.worcker.first_name }}
                  {{ scope.row.worcker.last_name }}
                </h4>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="hirer" label="Hirer">
            <template slot-scope="scope">
              <h5>${{ scope.row.hirer.email }}</h5>
            </template>
          </el-table-column>

          <el-table-column prop="status" label="Status">
            <template slot-scope="scope">
              <h4>{{ scope.row.status }}</h4>
              <!-- <div class="horizontal__center gap-4">
                <font-awesome-icon :icon="['far', 'eye']" />

                <p class="views">{{ scope.row.views }}k</p>
              </div> -->
            </template>
          </el-table-column>

          <el-table-column prop="created_at" label="Created At">
            <template slot-scope="scope">
              <h4>{{ scope.row.created_at }}</h4>
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
          :total="tablePaginationInfo.totalSize"
        >
        </el-pagination>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  components: {
    // ProductCard: () => import("@/components/Product/ProductCard"),
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
      tablePaginationInfo: {
        currentPage: 1,
        limit: 10,
        totalSize: 10,
      },
      cardsPaginationInfo: {
        currentPage: 1,
        hasNext: true,
        limit: 10,
        totalSize: 10,
      },
      productDropdownCommands: {
        ADD_TO_CART: "ADD_TO_CART",
      },
      isLoading: false,
      isLoadingMoreData: false,

      // new implementation
      cardsOrders: null,
      tableOrders: null,
    };
  },
  computed: {
    paginatedOrdersData() {
      if (!this.tableOrders) return [];

      return this.tableOrders.slice(
        (this.tablePaginationInfo.currentPage - 1) *
          this.tablePaginationInfo.limit,
        this.tablePaginationInfo.limit * this.tablePaginationInfo.currentPage
      );
    },
  },
  watch: {
    "$route.query": {
      immediate: true,
      handler() {
        this.fetchOrders();
      },
    },
  },
  methods: {
    getAvatarLink(avatar) {
      if (!avatar)
        return `https://images3.alphacoders.com/119/thumb-1920-1191196.jpg`;

      return `${process.env.VUE_APP_API_URL}/${avatar}`;
    },
    async handleLoadMore() {
      try {
        this.isLoadingMoreData = true;
        this.cardsPaginationInfo.currentPage =
          this.cardsPaginationInfo.currentPage + 1;

        await this.fetchOrders({
          replaceExisting: false,
        });
      } catch (err) {
        err;
      } finally {
        this.isLoadingMoreData = false;
      }
    },
    async fetchOrders(
      options = {
        replaceExisting: true,
        setDataYourself: true,
        viewType: "CARDS",
      }
    ) {
      options.setDataYourself =
        options.setDataYourself === undefined ? true : options.setDataYourself;

      const activePaginationKey =
        this.activeViewTab === "TABLE"
          ? "tablePaginationInfo"
          : "cardsPaginationInfo";

      const v = options.viewType || this.activeViewTab;
      const activeArrayKey = v === "TABLE" ? "tableOrders" : "cardsOrders";

      try {
        this.isLoading = true;
        const query = {
          limit: this[activePaginationKey].limit,
          page: this[activePaginationKey].currentPage,
          status: "",
        };
        const status = this.$route.query?.status || "all";

        query.status = status;

        const res = await this.$api.getWithPayload(`/orders`, query);

        this[activePaginationKey].limit = res.limit;
        this[activePaginationKey].totalSize = res.total;

        if (v === "GRID") {
          this[activePaginationKey].hasNext =
            res.docs.length >= this[activePaginationKey].limit;
        }

        if (options.replaceExisting) {
          this[activeArrayKey] = res.docs;
        } else if (!options.replaceExisting && options.setDataYourself) {
          if (this[activeArrayKey]) {
            // this[activeArrayKey] = [...this[activeArrayKey], ...res.docs];
            res.docs.forEach((g) => {
              if (
                this[activeArrayKey].find(
                  (order) =>
                    order._id === g._id && order.created_at === g.created_at
                )
              ) {
                return;
              }

              this[activeArrayKey].push(g);
            });
          } else {
            this[activeArrayKey] = res.docs;
          }
        }

        return res;
      } catch (err) {
        err;
        throw err;
      } finally {
        this.isLoading = false;
      }
    },
    async onTablePageChange(page) {
      // if (this.tablePaginationInfo.currentPage >= page) {
      //   this.tablePaginationInfo.currentPage = page;
      //   return;
      // }
      this.tablePaginationInfo.currentPage = page;
      await this.fetchOrders({
        replaceExisting: false,
      });

      // if (this.tablePaginationInfo.currentPage < page) {

      // await this.fetchOrders({
      //   replaceExisting: false,
      // });
      // }
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

    onActiveViewTabSelected(selectedView) {
      this.activeViewTab = selectedView;

      if (selectedView === "TABLE" && !this.tableOrders) {
        this.fetchOrders({
          view: "TABLE",
        });
      }
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
  margin-top: $spacing-2;
}
.products__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem 1rem;
}
</style>
