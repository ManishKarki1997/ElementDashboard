<template>
  <div class="dashboard__page create__gig">
    <CreateGigStepper />

    <div class="create__gig__body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    CreateGigStepper: () => import("@/components/Gigs/CreateGigStepper"),
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.create__gig__body {
  margin-top: $spacing-2;
}
</style>
