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
            :key="user.name + idx"
            :user="user"
            :idx="idx"
            :disableAnimation="false"
          />
        </div>

        <LoadMoreButton
          @loadMore="handleLoadMoreData"
          :loading="isLoadingMoreData"
        />
      </template>

      <template v-if="activeUsersTab === 'TABLE'">
        <div class="table__wrapper">
          <el-table :data="paginatedUsersData" style="width: 100%">
            <el-table-column prop="name" label="User" width="300">
              <template slot-scope="scope">
                <div class="horizontal__center gap-8">
                  <el-avatar
                    shape="square"
                    size="large"
                    :src="`https://avatars.dicebear.com/api/adventurer/${scope.row.name}.svg`"
                  ></el-avatar>

                  <h4>{{ scope.row.name }}</h4>
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="role" label="Role">
              <template slot-scope="scope">
                <h5>{{ scope.row.role }}</h5>
              </template>
            </el-table-column>

            <el-table-column prop="verified" label="Verification">
              <template slot-scope="scope">
                <el-tag
                  size="small"
                  :type="scope.row.verified ? 'primary' : 'danger'"
                  effect="dark"
                >
                  {{ scope.row.verified ? "Verified" : "Unverified" }}
                </el-tag>
              </template>
            </el-table-column>

            <el-table-column prop="joinedDate" label="Joined Date">
              <template slot-scope="scope">
                <h5>{{ scope.row.joinedDate }}</h5>
              </template>
            </el-table-column>

            <el-table-column prop="rate" label="Ratings" width="180">
              <template slot-scope="scope">
                <el-rate
                  v-model="scope.row.rating"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                >
                </el-rate>
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
            :total="users.length"
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
      users: [],
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
      activeUsersTab: "GRID",
      tableDropdownCommands: {
        QUICK_VIEW_PROFILE: "QUICK_VIEW_PROFILE",
        GOTO_PROFILE: "GOTO_PROFILE",
        BLOCK_USER: "BLOCK_USER",
      },
      usersTablePaginationInfo: {
        activeTablePage: 1,
        pageSize: 10,
      },
      isLoadingMoreData: false,
    };
  },
  computed: {
    paginatedUsersData() {
      return this.users.slice(
        this.usersTablePaginationInfo.pageSize *
          this.usersTablePaginationInfo.activeTablePage -
          this.usersTablePaginationInfo.pageSize,

        this.usersTablePaginationInfo.pageSize *
          this.usersTablePaginationInfo.activeTablePage
      );
    },
  },
  methods: {
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
      this.usersTablePaginationInfo.activeTablePage = page;
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
    handleLoadMoreData() {
      this.isLoadingMoreData = true;

      setTimeout(() => {
        this.addMoreUsers();
        this.isLoadingMoreData = false;
      }, 1000);
    },
  },
  mounted() {
    this.addMoreUsers();
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  @include spacing($spacing-2, "margin-top");
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

  @include spacing($spacing-2, "margin-bottom");
}
.user__grid__wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
</style>
