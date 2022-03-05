<template>
  <div class="dashboard__header">
    <div class="header__left">
      <!-- <h2>Dashboard</h2> -->
      <h3>{{ pageTitle || "Dashboard" }}</h3>
    </div>

    <div class="header__right">
      <div class="header__item icon__button">
        <el-badge is-dot class="item">
          <i class="el-icon-chat-line-round"></i>
        </el-badge>
      </div>

      <div @click="openNotificationSidebar" class="header__item icon__button">
        <el-badge is-dot class="item">
          <i class="el-icon-bell"></i>
        </el-badge>
      </div>

      <el-dropdown
        @command="handleDropdownCommand"
        trigger="click"
        placement="bottom-start"
      >
        <div class="header__item user__profile">
          <div class="user__image">
            <el-avatar
              shape="square"
              size="large"
              :src="require('@/assets/images/luffy clueless.jpg')"
            ></el-avatar>
            <!-- <img src="@/assets/images/luffy clueless.jpg" alt="User Image" /> -->
          </div>
          <!-- <div class="user__details">
            <h4>Monkey D. Luffy</h4>
            <p>Strawhat Pirates</p>
          </div> -->
        </div>

        <el-dropdown-menu
          class="has-bg has-shadow has-no-padding-block"
          slot="dropdown"
        >
          <el-dropdown-item
            class="user_profile_dropdown_item"
            icon="el-icon-user"
            >Profile</el-dropdown-item
          >
          <el-dropdown-item
            command="LOGOUT"
            class="logout__item danger user_profile_dropdown_item"
            icon="el-icon-remove-outline"
            >Logout</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { OPEN_NOTIFICATION_SIDEBAR } from "@/constants/event-names";

export default {
  computed: {
    pageTitle() {
      return this.$route.meta.name;
    },
  },
  methods: {
    openNotificationSidebar() {
      this.$bus.emit(OPEN_NOTIFICATION_SIDEBAR);
    },
    handleDropdownCommand(command) {
      if (command === "LOGOUT") {
        this.onClickLogout();
      }
    },
    onClickLogout() {
      this.$confirm(`Do you really want to logout?`, "Log Out?", {
        confirmButtonText: "Logout",
        cancelButtonText: "Cancel",
        type: "error",
        customClass: "dialog__danger",
      }).then(() => {
        this.$message({
          message: "Logged out successfully",
          type: "success",
        });
      });
    },
  },
};
</script>
