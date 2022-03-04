<template>
  <el-drawer
    class="notification__drawer"
    title="Notifications"
    :visible.sync="isNotificationDrawerOpen"
    :direction="direction"
    :before-close="beforeSidebarClose"
  >
    <ul class="notification__list">
      <li
        class="notification"
        v-for="notification in notifications"
        :key="'notification-' + notification.id"
      >
        <div class="notification__image">
          <img :src="notification.image" alt="" />
        </div>
        <div class="notification__content">
          <div class="user__name__wrapper">
            <h4 class="user__name">{{ notification.userName }}</h4>
            <span class="bullet">&bull;</span>
            <p class="notification__date">{{ notification.date }}</p>
          </div>
          <p class="notification__text">{{ notification.subtitle }}</p>
        </div>
      </li>
    </ul>
  </el-drawer>
</template>

<script>
import { OPEN_NOTIFICATION_SIDEBAR } from "@/constants/event-names";
export default {
  data() {
    return {
      direction: "rtl",
      isNotificationDrawerOpen: false,
      notifications: [],
    };
  },
  methods: {
    beforeSidebarClose() {
      this.isNotificationDrawerOpen = false;
    },
    generateRandomNotifications() {
      this.notifications = Array.from(Array(10).keys()).map((idx) => ({
        id: idx + 1,
        userName: `User ${idx + 1}`,
        image: `https://avatars.dicebear.com/api/adventurer/${idx}.svg`,
        subtitle:
          "Far far away, behind the word mountains, far from the countries Vokalia",
        date: `March ${idx + 1}, 2022`,
      }));
    },
  },
  mounted() {
    this.generateRandomNotifications();

    this.$bus.on(OPEN_NOTIFICATION_SIDEBAR, (value) => {
      this.isNotificationDrawerOpen = value === undefined ? true : value;
    });
  },
};
</script>

<style></style>
