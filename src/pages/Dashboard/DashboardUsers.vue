<template>
  <div class="dashboard__page dashboard-settings">
    <FiltersHeader
      :activeViewTab="activeViewTab"
      :filters="userFilters"
      :filtersForm="filtersForm"
      :loadingStates="loadingFilterStates"
      @ITEM_VIEW_TAB_ACTIVE="onActiveViewTabSelected"
      @ON_SELECT_CHANGE="onFiltersSelectChange"
    />

    <template v-if="activeViewTab === 'GRID'">
      <div class="users__grid">
        <template v-if="gridUsers">
          <UserCompactCard
            v-for="user in gridUsers"
            :key="user._id"
            :user="user"
          />
        </template>

        <template v-if="!gridUsers">
          <OrderCardSkeleton v-for="i in 8" :key="'order-card-skeleton-' + i" />
        </template>

        <template v-if="gridUsers && gridUsers.length === 0">
          <el-empty :image-size="100">
            <template #image>
              <font-awesome-icon :icon="['fas', 'users']" />
            </template>
            <template #description>
              <p>Sorry, there are no users available</p>
            </template>
          </el-empty>
        </template>
      </div>
      <LoadMoreButton
        v-if="cardsPaginationInfo.hasNext && gridUsers"
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
            prop="user_profile"
            label="Worcker"
            width="300"
          >
            <template slot-scope="scope">
              <div class="horizontal__center gap-8">
                <!-- <pre>{{ scope.row }}</pre> -->
                <el-avatar
                  style="min-width: 40px"
                  v-if="scope.row.user_profile"
                  shape="circle"
                  size="large"
                  :src="getAvatarLink(scope.row.user_profile.avatar)"
                ></el-avatar>

                <el-avatar
                  v-else
                  style="min-width: 40px"
                  shape="circle"
                  size="large"
                  :src="getAvatarLink(null)"
                ></el-avatar>

                <h4 v-if="scope.row.user_profile">
                  {{ scope.row.user_profile.first_name }}
                  {{ scope.row.user_profile.last_name }}
                </h4>

                <h4 v-else>
                  {{ scope.row.email }}
                </h4>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            :sortable="false"
            prop="created_at"
            label="Joined Date"
          >
            <template slot-scope="scope">
              <h5>{{ $utils.dateFns.formatDate(scope.row.created_at) }}</h5>
            </template>
          </el-table-column>

          <el-table-column :sortable="false" prop="role" label="Role">
            <template slot-scope="scope">
              <h5>{{ scope.row.default_role }}</h5>
            </template>
          </el-table-column>

          <el-table-column
            :sortable="false"
            prop="is_email_verified"
            label="Email Verified"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.is_email_verified ? '' : 'danger'"
                effect="dark"
              >
                {{ scope.row.verified ? "Verified" : "Unverified" }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column
            :sortable="false"
            prop="admin_verified"
            label="Admin Verified"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.admin_verified ? '' : 'danger'"
                effect="dark"
              >
                {{ scope.row.admin_verified ? "Verified" : "Unverified" }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column :sortable="false" prop="tier" label="Tier">
            <template slot-scope="scope">
              <h5 class="capitalize">{{ scope.row.tier }}</h5>
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
                    :command="userDropdownCommands.TOGGLE_VERIFICATION"
                    class="c__icon__dropdown__item"
                  >
                    <font-awesome-icon :icon="['fas', 'shopping-basket']" />

                    <span>Toggle Verification</span>
                  </el-dropdown-item>

                  <el-dropdown-item
                    :command="userDropdownCommands.GOTO_PROFILE"
                    class="c__icon__dropdown__item"
                  >
                    <font-awesome-icon :icon="['far', 'square']" />
                    <span> View Profile </span>
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
import debounce from "@/mixins/debounce";

export default {
  components: {
    OrderCardSkeleton: () =>
      import("@/components/Skeletons/Orders/OrderCardSkeleton"),
    UserCompactCard: () => import("@/components/User/UserCompactCard"),
    FiltersHeader: () => import("@/components/Dashboard/FiltersHeader"),
    LoadMoreButton: () => import("@/components/Common/LoadMoreButton"),
  },
  mixins: [debounce],
  data() {
    return {
      orderStatusesMap: keyValueMaps.orderStatusMaps,
      loadingFilterStates: {},
      userFilters: [
        {
          shouldShowLoading: true,
          name: "Email",
          type: "INPUT",
          formName: "email",
          placeholder: "Type user email",
        },
        {
          formName: "default_role",
          name: "Role",
          options: [
            {
              label: "Worcker",
              value: "worcker",
            },
            {
              label: "Hirer",
              value: "hirer",
            },
            {
              label: "Organization",
              value: "organization",
            },
          ],
        },
        // {
        //   formName: "category_id",
        //   name: "Category",
        //   isFilterable: true,
        //   hasFetchedData: false,
        //   options: [],
        // },
        {
          formName: "tier",
          name: "Tier",
          options: [
            {
              label: "Standard",
              value: "standard",
            },
            {
              label: "Silver",
              value: "silver",
            },
            {
              label: "Gold",
              value: "gold",
            },
            {
              label: "Diamond",
              value: "diamond",
            },
            {
              label: "Platinum",
              value: "platinum",
            },
          ],
        },
      ],
      filtersForm: {
        email: "",
        default_role: "",
        category_id: "",
        tier: "",
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
      userDropdownCommands: {
        TOGGLE_VERIFICATION: "TOGGLE_VERIFICATION",
        GOTO_PROFILE: "GOTO_PROFILE",
      },
      isLoading: false,
      isLoadingMoreData: false,

      // new implementation
      gridUsers: null,
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
          this.gridUsers = null;
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
          this.userFilters = this.userFilters.map((f) =>
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

    // this.$store.dispatch("category/fetchCategories");
  },
  methods: {
    onFiltersSelectChange({ name, value, isTypeSort, type, filter }) {
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

      // console.log(type, name, value, this.filtersForm[name]);

      if (type === "INPUT") {
        this.debounce(async () => {
          this.loadingFilterStates = {
            ...this.loadingFilterStates,
            [filter.name]: true,
          };

          this.$router
            .replace({
              query: {
                ...queryToReplaceRoute,
              },
            })
            .catch((err) => {
              err;
            });

          await this.fetchOrders({
            setDataForBothView: true,
            replaceExisting: true,
            setDataYourself: true,
          });

          this.loadingFilterStates = {
            ...this.loadingFilterStates,
            [filter.name]: false,
          };
        }, 1000);
      } else {
        this.$router
          .replace({
            query: {
              ...queryToReplaceRoute,
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
      }
    },
    setQueries() {
      const { sort_field, sort_order, default_role } = this.$route.query;
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
        default_role,
      };

      if (default_role) {
        tempSortData.default_role = default_role;
      } else {
        delete tempSortData.default_role;
        delete this.sortData.default_role;
        delete this.queries.default_role;
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
      if (this.isLoading) return false;

      options.setDataYourself =
        options.setDataYourself === undefined ? true : options.setDataYourself;

      const activePaginationKey =
        this.activeViewTab === "TABLE"
          ? "tablePaginationInfo"
          : "cardsPaginationInfo";

      const v = options.viewType || this.activeViewTab;
      const activeArrayKey = v === "TABLE" ? "tableOrders" : "gridUsers";
      const inactiveArrayKey = v === "TABLE" ? "gridUsers" : "tableOrders";

      try {
        this.isLoading = true;
        let searchData = {
          limit: this[activePaginationKey].limit,
          page: this[activePaginationKey].currentPage,
          ...this.sortData,
        };

        const userRole = this.$route.query.default_role;

        const res = await this.$api.getWithPayload(
          `/${
            !userRole || userRole === "admin" ? "admins" : "users"
          }?queries=${JSON.stringify(this.queries)}`,
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
      } else if (selectedView === "GRID" && !this.gridUsers) {
        this.fetchOrders({
          view: "GRID",
        });
      }
    },
    handleDropdownCommand(command, user) {
      if (command === this.userDropdownCommands.TOGGLE_VERIFICATION) {
        console.log(command);
      } else if (command === this.userDropdownCommands.GOTO_PROFILE) {
        this.$router.push(`/app/profile/${user.email}`);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.pagination {
  margin-top: $spacing-2;
}
.users__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem 1rem;
}
</style>
