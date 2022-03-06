<template>
  <div class="dashboard-home">
    <Sidebar />
    <NotificationDrawer />
    <div class="dashboard__body">
      <DashboardHeader />
      <main class="dashboard__body-content">
        <router-view></router-view>
      </main>
    </div>

    <SendMessageModal />
  </div>
</template>

<script>
export default {
  components: {
    Sidebar: () => import("@/components/Dashboard/Sidebar"),
    SendMessageModal: () =>
      import("@/components/DialogModals/SendMessageModal"),
    DashboardHeader: () => import("@/components/Dashboard/DashboardHeader"),
    NotificationDrawer: () =>
      import("@/components/Dashboard/NotificationDrawer"),
  },
};
</script>
