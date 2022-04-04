<template>
  <div v-animate-css="animationObj" class="user__compact__card">
    <!-- <pre>{{ user }}</pre> -->
    <div class="user__left">
      <div class="user__image">
        <el-tooltip
          class="item"
          effect="dark"
          :content="
            user.is_email_verified ? 'Email Verified' : 'Email Unverified'
          "
          placement="top-start"
        >
          <el-badge
            is-dot
            class="item"
            :type="
              user.is_email_verified || user.role === 'super'
                ? 'success'
                : 'danger'
            "
          >
            <el-avatar
              v-if="user.user_profile && user.user_profile.avatar"
              shape="square"
              size="large"
              :src="`${apiUrl}/${user.user_profile.avatar}`"
            ></el-avatar>

            <el-avatar
              v-else
              shape="square"
              size="large"
              :src="`https://avatars.dicebear.com/api/adventurer/${
                user.user_profile ? user.user_profile.first_name : user._id
              }.svg`"
            ></el-avatar>
          </el-badge>
        </el-tooltip>
      </div>

      <div class="user__info">
        <template>
          <h4 v-if="user.user_profile" class="user__name">
            {{ user.user_profile.first_name }} {{ user.user_profile.last_name }}
          </h4>

          <h4 v-else-if="user.role === 'super'" class="user__name">
            {{ user.first_name }} {{ user.last_name }}
          </h4>
          <h4 v-else class="user__name">
            {{ user.email }}
          </h4>
        </template>

        <p class="user__subtitle small__secondary capitalize">
          {{
            user.default_role === "both"
              ? "SuperAdmin"
              : user.role === "super"
              ? "Admin"
              : user.default_role
          }}
        </p>
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
            command="QUICK_VIEW_PROFILE"
            class=""
            icon="el-icon-user"
            >Quick View Profile</el-dropdown-item
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
    idx: {
      type: Number,
      default: 0,
    },
    user: {
      type: Object,
      required: true,
    },
    disableAnimation: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      userDropdownCommands: {
        QUICK_VIEW_PROFILE: "QUICK_VIEW_PROFILE",
        GOTO_PROFILE: "GOTO_PROFILE",
        BLOCK_USER: "BLOCK_USER",
      },
      apiUrl: process.env.VUE_APP_API_URL,
    };
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
      } else if (command === this.userDropdownCommands.GOTO_PROFILE) {
        this.$router.push(`/app/profile/${this.user.email}`);
      }
    },
  },
};
</script>
