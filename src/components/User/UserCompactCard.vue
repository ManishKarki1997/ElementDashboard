<template>
  <div class="user__compact__card">
    <div class="user__left">
      <div class="user__image">
        <el-tooltip
          class="item"
          effect="dark"
          :content="user.verified ? 'Verified' : 'Unverified'"
          placement="top-start"
        >
          <el-badge
            is-dot
            class="item"
            :type="user.verified ? 'success' : 'danger'"
          >
            <el-avatar
              shape="square"
              size="large"
              :src="`https://avatars.dicebear.com/api/adventurer/${user.name}.svg`"
            ></el-avatar>
          </el-badge>
        </el-tooltip>
      </div>

      <div class="user__info">
        <h4 class="user__name">{{ user.name }}</h4>
        <p class="user__subtitle small__secondary">{{ user.role }}</p>
      </div>
    </div>

    <div class="user__right">
      <el-dropdown
        @command="handleDropdownCommand"
        trigger="click"
        placement="bottom-end"
      >
        <i class="el-icon-more cursor_pointer"></i>

        <el-dropdown-menu
          class="has-bg has-shadow has-no-padding-block"
          slot="dropdown"
        >
          <el-dropdown-item
            command="VIEW_QUICK_PROFILE"
            class=""
            icon="el-icon-user"
            >View Quick Profile</el-dropdown-item
          >
          <el-dropdown-item command="GOTO_PROFILE" class="" icon="el-icon-user"
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
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      userDropdownCommands: {
        VIEW_QUICK_PROFILE: "VIEW_QUICK_PROFILE",
        GOTO_PROFILE: "GOTO_PROFILE",
        BLOCK_USER: "BLOCK_USER",
      },
    };
  },
  methods: {
    handleDropdownCommand(command) {
      console.log(command);
      if (command === this.userDropdownCommands.BLOCK_USER) {
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
  },
};
</script>
