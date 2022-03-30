<template>
  <div class="dashboard__page">
    <div class="filters__header">
      <div class="filters__wrapper horizontal__center gap-12">
        <el-form ref="form" :model="form">
          <el-row :gutter="8">
            <el-col v-for="filter in filters" :key="filter.name" :span="12">
              <el-form-item :label="filter.name">
                <el-select
                  v-model="form[filter.formName]"
                  clearable
                  :placeholder="filter.name"
                  :label="filter.name"
                >
                  <el-option
                    v-for="item in filter.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div class="views__wrapper horizontal__center">
        <el-button
          @click="selectActiveUsersTab('GRID')"
          class="icon__button bg__secondary"
          icon="el-icon-menu"
        ></el-button>
        <el-button
          @click="selectActiveUsersTab('TABLE')"
          class="icon__button bg__secondary"
          icon="el-icon-s-operation"
        ></el-button>
      </div>
    </div>

    <div class="user__content__wrapper">
      <template v-if="activeUsersTab === 'GRID'">
        <div class="user__grid__wrapper">
          <UserCompactCard
            v-for="(user, idx) in users"
            :key="user._id"
            :user="user"
            :idx="idx"
            :disableAnimation="false"
          />
        </div>

        <LoadMoreButton
          v-if="!hasNoMoreData"
          @loadMore="handleLoadMoreData"
          :loading="isLoadingMoreData"
        />
      </template>
      <!-- <pre>{{ paginatedUsersData }}</pre> -->
      <template v-if="activeUsersTab === 'TABLE'">
        <div class="table__wrapper">
          <el-table
            v-loading="isLoadingUsers"
            :data="paginatedUsersData"
            style="width: 100%"
            @sort-change="handleSortChange"
          >
            <el-table-column prop="user_profile" label="User" width="300">
              <template slot-scope="scope">
                <div class="horizontal__center gap-8">
                  <el-avatar
                    v-if="scope.row.user_profile.avatar"
                    shape="square"
                    size="large"
                    :src="`${apiUrl}/${scope.row.user_profile.avatar}`"
                  ></el-avatar>

                  <el-avatar
                    v-else
                    shape="square"
                    size="large"
                    :src="`https://avatars.dicebear.com/api/adventurer/${
                      scope.row.user_profile
                        ? scope.row.user_profile.first_name
                        : scope.row.user_profile._id
                    }.svg`"
                  ></el-avatar>

                  <router-link
                    v-if="scope.row.user_profile.first_name"
                    to="/app/profile/starscream"
                    >{{ scope.row.user_profile.first_name }}
                    {{ scope.row.user_profile.last_name }}</router-link
                  >

                  <router-link v-else to="/app/profile/starscream"
                    >{{ scope.row.user_profile.email }}
                  </router-link>
                </div>
              </template>
            </el-table-column>

            <el-table-column sortable prop="default_role" label="Role">
              <template slot-scope="scope">
                <h5 class="uppercase">{{ scope.row.default_role }}</h5>
              </template>
            </el-table-column>

            <el-table-column
              sortable
              prop="is_email_verified"
              label="Email Verified"
            >
              <template slot-scope="scope">
                <el-tag
                  size="small"
                  :type="scope.row.is_email_verified ? 'primary' : 'danger'"
                  effect="dark"
                >
                  {{ scope.row.is_email_verified ? "Verified" : "Unverified" }}
                </el-tag>
              </template>
            </el-table-column>

            <el-table-column sortable prop="created_at" label="Joined At">
              <template slot-scope="scope">
                <h5>{{ $utils.dateFns.formatDate(scope.row.created_at) }}</h5>
              </template>
            </el-table-column>

            <el-table-column prop="tier" label="Tier">
              <template slot-scope="scope">
                <el-tag
                  type="primary"
                  size="small"
                  effect="plain"
                  class="capitalize"
                  >{{ scope.row.tier }}</el-tag
                >
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
                    class="has-shadow has-no-padding-block"
                    slot="dropdown"
                  >
                    <el-dropdown-item
                      command="QUICK_VIEW_PROFILE"
                      class=""
                      icon="el-icon-user"
                      >Quick View Profile</el-dropdown-item
                    >
                    <el-dropdown-item
                      command="GOTO_PROFILE"
                      class=""
                      icon="el-icon-user"
                      >Goto Profile</el-dropdown-item
                    >

                    <el-dropdown-item
                      command="BLOCK_USER"
                      class=""
                      icon="el-icon-remove-outline"
                      >Block User</el-dropdown-item
                    >
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
            :total="usersTablePaginationInfo.totalSize"
          >
          </el-pagination>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    UserCompactCard: () => import("@/components/User/UserCompactCard"),
    LoadMoreButton: () => import("@/components/Common/LoadMoreButton"),
  },
  data() {
    return {
      users: null,
      isLoadingUsers: false,
      hasNoMoreData: false,
      searchData: {},
      filters: [
        {
          formName: "verificationStatus",

          name: "Verification Status",
          options: [
            {
              label: "Verified",
              value: "verified",
            },
            {
              label: "Unverified",
              value: "unverified",
            },
          ],
        },
        {
          formName: "joinedDate",

          name: "Joined Date",
          options: [
            {
              label: "Latest",
              value: "created_at:desc",
            },
            {
              label: "Oldest",
              value: "created_at:asc",
            },
          ],
        },
      ],
      form: {
        verificationStatus: "",
        joinedDate: "",
      },
      activeUsersTab: "TABLE",
      tableDropdownCommands: {
        QUICK_VIEW_PROFILE: "QUICK_VIEW_PROFILE",
        GOTO_PROFILE: "GOTO_PROFILE",
        BLOCK_USER: "BLOCK_USER",
      },
      usersTablePaginationInfo: {
        activeTablePage: 1,
        pageSize: 2,
        totalSize: 10,
      },
      isLoadingMoreData: false,
      apiUrl: process.env.VUE_APP_API_URL,
    };
  },
  computed: {
    paginatedUsersData() {
      if (!this.users) return [];

      const sliced = this.users.slice(
        this.usersTablePaginationInfo.pageSize *
          this.usersTablePaginationInfo.activeTablePage -
          this.usersTablePaginationInfo.pageSize,

        this.usersTablePaginationInfo.pageSize *
          this.usersTablePaginationInfo.activeTablePage
      );

      const mapped = sliced.map((u) => ({
        ...u,
        user_profile: u.user_profile
          ? {
              ...u.user_profile,
              email: u.email,
              _id: u._id,
              default_role: u.default_role,
            }
          : {
              email: u.email,
              _id: u._id,
              default_role: u.default_role,
            },
      }));

      return mapped;
    },
  },
  methods: {
    handleSortChange(data) {
      const { prop, order } = data;

      this.searchData.sort_order = order;
      this.searchData.sort_field = prop;
      this.fetchUsers(true);
    },
    addMoreUsers(amount = 20) {
      Array.from(Array(amount).keys()).forEach((idx) => {
        this.users.push({
          verified: Math.random() < 0.5,
          rating: parseInt((Math.random() * 3 + 1).toFixed(2)),
          joinedDate: Math.round(Math.random() * 9 + 2) + " months ago",
          name: "Victoria Wilkiins " + idx,
          email: "victoriawilkins@gmail.com",
          role: "CEO",
        });
      });
    },

    onTablePageChange(page) {
      if (this.hasNoMoreData) return;

      console.log(this.usersTablePaginationInfo.activeTablePage, page);
      if (this.usersTablePaginationInfo.activeTablePage >= page) return;

      this.usersTablePaginationInfo.activeTablePage = page;
      this.fetchUsers();
    },
    selectActiveUsersTab(selected) {
      this.activeUsersTab = selected;
    },
    handleDropdownCommand(command, user) {
      user;
      if (command === this.tableDropdownCommands.BLOCK_USER) {
        this.$confirm(`Do you really want to block this user?`, "Block User?", {
          confirmButtonText: "Block",
          cancelButtonText: "Cancel",
          type: "error",
          customClass: "dialog__danger",
        }).then(() => {
          this.$message({
            message: "User Blocked Successfully",
            type: "success",
          });
        });
      }
    },
    onSubmit() {
      console.log("submit!");
    },
    async handleLoadMoreData() {
      try {
        this.isLoadingMoreData = true;

        this.usersTablePaginationInfo.activeTablePage =
          this.usersTablePaginationInfo.activeTablePage + 1;

        await this.fetchUsers();
      } catch (err) {
        if (err) {
          this.$notify({
            title: "Something went wrong",
            message: "Couldn't fetch more users",
            type: "error",
          });
        }
      } finally {
        this.isLoadingMoreData = false;
      }
    },
    async fetchUsers(replaceExisting = false) {
      try {
        if (this.isLoadingUsers) return;

        this.isLoadingUsers = true;

        const res = await this.$api.getWithPayload(
          `/users?limit=${this.usersTablePaginationInfo.pageSize}&page=${this.usersTablePaginationInfo.activeTablePage}`,
          {
            queries: {
              ...this.queries,
            },
          }
        );

        this.usersTablePaginationInfo.totalSize = res.total;
        this.usersTablePaginationInfo.pageSize = res.limit;
        this.usersTablePaginationInfo.activeTablePage = res.page;
        console.log(res);
        if (res.docs.length === 0) {
          this.hasNoMoreData = true;

          // step back one page otherwise, the table will show empty
          this.usersTablePaginationInfo.activeTablePage =
            this.usersTablePaginationInfo.activeTablePage - 1;
          return;
        }
        if (!replaceExisting && this.users) {
          res.docs.forEach((u) => {
            if (this.users.find((usr) => usr._id === u._id)) return;

            this.users.push(u);
          });
          // this.users = [...this.users, ...res.docs];
        } else {
          this.users = [...res.docs];
        }
      } catch (err) {
        console.log(err, err?.response);
      } finally {
        this.isLoadingUsers = false;
      }
    },
  },
  mounted() {
    // this.addMoreUsers();
  },
  watch: {
    "$route.query": {
      immediate: true,
      handler(query) {
        this.searchData.default_role =
          query?.role === "admin" ? "both" : query?.role;
        this.fetchUsers();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: $spacing-2;
}
.filters__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @include themed() {
    background-color: t($bg-secondary);
    padding: 0 1rem;
  }
  @include radius();
  @include box-shadow();

  margin-bottom: $spacing-2;
}
.user__grid__wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
</style>
