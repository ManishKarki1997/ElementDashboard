<template>
  <div class="dashboard__page create__gig">
    <CreateGigStepper />
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

<style></style>
