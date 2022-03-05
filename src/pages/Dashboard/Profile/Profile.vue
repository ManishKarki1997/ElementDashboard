<template>
  <div class="profile__main__page">
    <el-menu default-active="0" class="profile__links">
      <router-link
        v-for="sidebarLink in profileLinks"
        :key="sidebarLink.name"
        :to="sidebarLink.path"
        custom
        v-slot="{ href, navigate, isActive, isExactActive }"
      >
        <el-menu-item
          :class="[
            isActive && 'router-link-active ',
            isExactActive && 'router-link-exact-active is-active',
          ]"
          active-class="is-active"
          :href="href"
          @click="navigate"
        >
          <font-awesome-icon :icon="sidebarLink.icon" />
          <span>{{ sidebarLink.name }}</span>
        </el-menu-item>
      </router-link>
    </el-menu>

    <div class="profile__content-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profileLinks: [
        {
          icon: ["fas", "info-circle"],
          name: "Basic Info",
          path: "/app/profile/starscream",
        },
        {
          icon: ["fas", "th-large"],
          name: "Listed Products",
          path: "/app/profile/starscream/listed-products",
        },
        {
          icon: ["far", "comments"],
          name: "Reviews",
          path: "/app/profile/starscream/reviews",
        },
        {
          icon: ["far", "bell"],
          name: "Notifications",
          path: "/app/profile/starscream/notifications",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.profile__links {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: transparent;

  & > * {
    width: max-content;
  }

  > li {
    display: flex;
    align-items: center;
    gap: $spacing-8px;
    margin-bottom: 0;
  }
}

.profile__content-main {
  padding: 1rem 8px;
}
</style>
