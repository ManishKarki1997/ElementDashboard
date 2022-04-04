<template>
  <div class="dashboard__page dashboard-settings">
    <FiltersHeader
      :activeViewTab="activeViewTab"
      :filters="productFilters"
      :filtersForm="filtersForm"
      @ITEM_VIEW_TAB_ACTIVE="onActiveViewTabSelected"
      @ON_SELECT_CHANGE="onFiltersSelectChange"
    />

    <template v-if="activeViewTab === 'GRID'">
      <div class="orders__grid">
        <template v-if="gridOrders">
          <OrderCard
            v-for="order in gridOrders"
            :key="order._id"
            :order="order"
          />
        </template>

        <template v-if="!gridOrders">
          <OrderCardSkeleton v-for="i in 8" :key="'order-card-skeleton-' + i" />
        </template>

        <template v-if="gridOrders && gridOrders.length === 0">
          <el-empty :image-size="100">
            <template #image>
              <font-awesome-icon :icon="['fas', 'shopping-basket']" />
            </template>
            <template #description>
              <p>Sorry, there are no orders available</p>
            </template>
          </el-empty>
        </template>
      </div>
      <LoadMoreButton
        v-if="cardsPaginationInfo.hasNext && gridOrders"
        @loadMore="handleLoadMore"
        :loading="isLoadingMoreData"
      />
    </template>

    <template v-if="activeViewTab === 'TABLE'">
      <div class="table__wrapper">
        <el-table
          @sort-change="onTableSort"
          v-loading="isLoading"
          :data="paginatedOrdersData"
          style="width: 100%"
        >
          <el-table-column
            :sortable="false"
            prop="worcker"
            label="Worcker"
            width="300"
          >
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

          <el-table-column :sortable="false" prop="hirer" label="Hirer">
            <template slot-scope="scope">
              <h4>{{ scope.row.hirer.email }}</h4>
            </template>
          </el-table-column>

          <el-table-column prop="status" label="Status">
            <template slot-scope="scope">
              <el-tag
                class="order__status"
                size="medium"
                effect="dark"
                :type="orderStatusesMap[scope.row.status].type"
                >{{ orderStatusesMap[scope.row.status].name }}</el-tag
              >
            </template>
          </el-table-column>

          <el-table-column
            :sortable="false"
            prop="created_at"
            label="Created At"
          >
            <template slot-scope="scope">
              <h4>{{ $utils.dateFns.formatDate(scope.row.created_at) }}</h4>
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
import { mapState } from "vuex";
import { keyValueMaps } from "@/constants";

export default {
  components: {
    OrderCardSkeleton: () =>
      import("@/components/Skeletons/Orders/OrderCardSkeleton"),
    OrderCard: () => import("@/components/Orders/OrderCard"),
    FiltersHeader: () => import("@/components/Dashboard/FiltersHeader"),
    LoadMoreButton: () => import("@/components/Common/LoadMoreButton"),
  },
  data() {
    return {
      orderStatusesMap: keyValueMaps.orderStatusMaps,
      productFilters: [
        {
          isTypeSort: true,
          formName: "created_at",
          name: "Ordered Date",
          options: [
            {
              label: "Latest",
              value: "desc",
            },
            {
              label: "Oldest",
              value: "asc",
            },
          ],
        },
        {
          formName: "category_id",
          name: "Category",
          isFilterable: true,
          hasFetchedData: false,
          options: [],
        },
        {
          formName: "status",
          name: "Status",
          options: [
            {
              label: "All",
              value: "all",
            },
            {
              label: "Contract accepted by hirer",
              value: "contract_accepted_by_hirer",
            },
            {
              label: "Requested",
              value: "requested",
            },
            {
              label: "Completed",
              value: "completed",
            },
            {
              label: "Unresponded",
              value: "unresponded",
            },
            {
              label: "Cancelled",
              value: "cancelled",
            },
          ],
        },
      ],
      filtersForm: {
        created_at: "desc",
        category_id: "",
        status: "",
      },
      activeViewTab: "GRID",
      // activeViewTab: "TABLE",
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
      gridOrders: null,
      tableOrders: null,
      sortData: {},
      queries: {},
    };
  },
  computed: {
    ...mapState("category", ["categories"]),
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
      // immediate: true,
      handler() {
        if (this.viewType === "GRID") {
          this.gridOrders = null;
        } else {
          this.tableOrders = null;
        }
        this.setQueries();
        this.fetchOrders({
          replaceExisting: true,
          setDataForBothView: true,
        });
      },
    },
    categories: {
      immediate: true,
      handler(val) {
        if (val) {
          this.productFilters = this.productFilters.map((f) =>
            f.formName !== "category_id"
              ? f
              : {
                  ...f,
                  options: val.map((v) => ({
                    label: v.name,
                    value: v._id,
                  })),
                  hasFetchedData: true,
                }
          );
        }
      },
    },
  },
  mounted() {
    this.setQueries();
    this.fetchOrders({
      replaceExisting: false,
    });

    this.$store.dispatch("category/fetchCategories");
  },
  methods: {
    onFiltersSelectChange({ name, value, isTypeSort }) {
      console.log({
        name,
        value,
      });
      if (isTypeSort) {
        this.filtersForm[name] = value;
        if (this.sortData[name] !== undefined) {
          delete this.sortData.sort_field;
          delete this.sortData.sort_value;
        } else {
          this.sortData = {
            ...this.sortData,
            sort_field: name,
            sort_value: value,
          };
        }
      } else {
        this.filtersForm[name] = value;

        if (value !== null || value !== undefined) {
          this.queries[name] = value;
        } else {
          delete this.queries[name];
        }
      }

      const queryToReplaceRoute = {};
      Object.keys(this.queries).forEach((k) => {
        if (this.queries[k]) {
          queryToReplaceRoute[k] = this.queries[k];
        }
      });

      this.$router
        .replace({
          query: {
            ...queryToReplaceRoute,
            // [name]: value,
          },
        })
        .catch((err) => {
          err;
        });

      this.fetchOrders({
        setDataForBothView: true,
        replaceExisting: true,
        setDataYourself: true,
      });
    },
    setQueries() {
      const { sort_field, sort_order, status } = this.$route.query;
      // console.log(this.$route.query);
      let tempSortData = {};

      if (sort_field && sort_order) {
        tempSortData = {
          ...tempSortData,
          sort_field,
          sort_order,
        };
      }

      this.queries = {
        ...this.queries,
      };

      if (status) {
        tempSortData.status = status;
        this.filtersForm.status = status;
      } else {
        delete tempSortData.status;
        delete this.sortData.status;
        this.filtersForm.status = "all";
      }

      this.sortData = {
        ...this.sortData,
        ...tempSortData,
      };
    },
    onTableSort({ prop, order }) {
      // console.log(column, prop, order);
      const sort_field = prop;
      const sort_order = order || "desc";

      this.$router
        .replace({
          query: {
            sort_field,
            sort_order,
          },
        })
        .catch((err) => {
          err;
        });
    },
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
        setDataForBothView: false,
        replaceExisting: true,
        setDataYourself: true,
        viewType: "GRID",
      }
    ) {
      options.setDataYourself =
        options.setDataYourself === undefined ? true : options.setDataYourself;

      const activePaginationKey =
        this.activeViewTab === "TABLE"
          ? "tablePaginationInfo"
          : "cardsPaginationInfo";

      const v = options.viewType || this.activeViewTab;
      const activeArrayKey = v === "TABLE" ? "tableOrders" : "gridOrders";
      const inactiveArrayKey = v === "TABLE" ? "gridOrders" : "tableOrders";

      try {
        this.isLoading = true;
        let searchData = {
          limit: this[activePaginationKey].limit,
          page: this[activePaginationKey].currentPage,
          ...this.sortData,
        };

        const res = await this.$api.getWithPayload(
          `/orders?queries=${JSON.stringify(this.queries)}`,
          searchData
        );

        this[activePaginationKey].limit = res.limit;
        this[activePaginationKey].totalSize = res.total;

        if (v === "GRID") {
          this[activePaginationKey].hasNext =
            res.docs.length >= this[activePaginationKey].limit;
        }

        if (options.replaceExisting) {
          this[activeArrayKey] = res.docs;

          if (options.setDataForBothView) {
            this[inactiveArrayKey] = res.docs;
          }
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

              if (options.setDataForBothView) {
                this[inactiveArrayKey].push(g);
              }
            });
          } else {
            this[activeArrayKey] = [...res.docs];

            if (options.setDataForBothView) {
              this[inactiveArrayKey] = [...res.docs];
            }
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

    onActiveViewTabSelected(selectedView) {
      this.activeViewTab = selectedView;

      if (selectedView === "TABLE" && !this.tableOrders) {
        this.fetchOrders({
          view: "TABLE",
        });
      } else if (selectedView === "GRID" && !this.gridOrders) {
        this.fetchOrders({
          view: "GRID",
        });
      }
    },
    handleDropdownCommand(command) {
      if (command === this.productDropdownCommands.ADD_TO_CART) {
        console.log(command);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.pagination {
  margin-top: $spacing-2;
}
.orders__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem 1rem;
}
</style>
