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

      <div class="views__wrapper horizontal__center gap-12">
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
      <div class="user__grid__wrapper">
        <template v-if="activeUsersTab === 'GRID'">
          <UserCompactCard
            v-for="(user, idx) in users"
            :key="user.name + idx"
            :user="user"
          />
        </template>

        <template v-if="activeUsersTab === 'TABLE'">
          <el-table :data="users" style="width: 100%">
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

            <el-table-column prop="joinedDate" label="Joined Date">
              <template slot-scope="scope">
                <h5>{{ scope.row.joinedDate }}</h5>
              </template>
            </el-table-column>

            <el-table-column prop="name" label="Name" width="180">
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
                  placement="bottom-start"
                >
                  <el-button size="mini" type="primary">Action</el-button>

                  <el-dropdown-menu
                    class="has-shadow has-no-padding-block"
                    slot="dropdown"
                  >
                    <el-dropdown-item
                      command="VIEW_QUICK_PROFILE"
                      class=""
                      icon="el-icon-user"
                      >View Quick Profile</el-dropdown-item
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

                <!-- <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >Edit</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >Delete</el-button
                > -->
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    UserCompactCard: () => import("@/components/User/UserCompactCard"),
  },
  data() {
    return {
      users: [
        {
          verified: Math.random() < 0.5,
          rating: parseInt((Math.random() * 3 + 1).toFixed(2)),
          joinedDate: Math.round(Math.random() * 9 + 2) + " months ago",
          name: "Victoria Wilkiins",
          email: "victoriawilkins@gmail.com",
          role: "CEO",
        },
        {
          verified: Math.random() < 0.5,
          rating: parseInt((Math.random() * 3 + 1).toFixed(2)),
          joinedDate: Math.round(Math.random() * 9 + 2) + " months ago",
          name: "Hannah Par",
          email: "hannahpar@gmail.com",
          role: "Project Manager",
        },
        {
          verified: Math.random() < 0.5,
          rating: parseInt((Math.random() * 3 + 1).toFixed(2)),
          joinedDate: Math.round(Math.random() * 9 + 2) + " months ago",
          name: "Adrian	Peake",
          email: "adrianpeake@gmail.com",
          role: "Frontend Developer",
        },
        {
          verified: Math.random() < 0.5,
          rating: parseInt((Math.random() * 3 + 1).toFixed(2)),
          joinedDate: Math.round(Math.random() * 9 + 2) + " months ago",
          name: "Stephen Churchill",
          email: "stephenchurhcill@gmail.com",
          role: "Graphics Designer",
        },
        {
          verified: Math.random() < 0.5,
          rating: parseInt((Math.random() * 3 + 1).toFixed(2)),
          joinedDate: Math.round(Math.random() * 9 + 2) + " months ago",
          name: "Andrea Duncan",
          email: "andreaduncan@gmail.com",
          role: "Backend Developer",
        },
        {
          verified: Math.random() < 0.5,
          rating: parseInt((Math.random() * 3 + 1).toFixed(2)),
          joinedDate: Math.round(Math.random() * 9 + 2) + " months ago",
          name: "Edward Cameron",
          email: "edwardcameron@gmail.com",
          role: "Backend Developer",
        },
        {
          verified: Math.random() < 0.5,
          rating: parseInt((Math.random() * 3 + 1).toFixed(2)),
          joinedDate: Math.round(Math.random() * 9 + 2) + " months ago",
          name: "Carl Bell",
          email: "carlbell@gmail.com",
          role: "Frontend Developer",
        },
        {
          verified: Math.random() < 0.5,
          rating: parseInt((Math.random() * 3 + 1).toFixed(2)),
          joinedDate: Math.round(Math.random() * 9 + 2) + " months ago",
          name: "Pippa Reid",
          email: "pippareid@gmail.com",
          role: "Marketing Manager",
        },
        {
          verified: Math.random() < 0.5,
          rating: parseInt((Math.random() * 3 + 1).toFixed(2)),
          joinedDate: Math.round(Math.random() * 9 + 2) + " months ago",
          name: "Wendy Wright",
          email: "wendyright@gmail.com",
          role: "Hiring Manager",
        },
      ],
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
      // activeUsersTab: "GRID",
      activeUsersTab: "TABLE",
      tableDropdownCommands: {
        VIEW_QUICK_PROFILE: "VIEW_QUICK_PROFILE",
        GOTO_PROFILE: "GOTO_PROFILE",
        BLOCK_USER: "BLOCK_USER",
      },
    };
  },
  methods: {
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
  },
};
</script>

<style lang="scss" scoped>
.filters__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @include spacing($spacing-2, "margin-bottom");
}
.user__grid__wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
</style>
