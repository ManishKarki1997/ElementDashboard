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
        placement="bottom-start"
      >
        <i class="el-icon-more cursor_pointer"></i>

        <el-dropdown-menu
          class="has-bg has-shadow has-no-padding-block"
          slot="dropdown"
        >
          <el-dropdown-item class="" icon="el-icon-user"
            >View Quick Profile</el-dropdown-item
          >
          <el-dropdown-item class="" icon="el-icon-user"
            >Goto Profile</el-dropdown-item
          >

          <el-dropdown-item class="" icon="el-icon-remove-outline"
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
  methods: {
    handleDropdownCommand(command) {
      console.log(command);
    },
  },
};
</script>

<style scoped lang="scss">
.user__compact__card {
  display: flex;
  justify-content: space-between;
  max-width: 400px;
  padding: 1rem;
  width: 100%;

  @include radius($normal);
  @include themed() {
    background-color: t($bg-secondary);
  }

  .user__left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}
</style>
