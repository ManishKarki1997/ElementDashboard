<template>
  <div class="create__gig__stepper">
    <el-steps :active="activeStepper">
      <el-step
        @click.native="gotoStepper(idx)"
        v-for="(stepper, idx) in stepperItems"
        :key="stepper.name"
        :icon="stepper.iconName"
        :title="stepper.name"
        :description="stepper.description"
      >
      </el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stepperItems: [
        {
          name: "Gig Overview",
          iconName: "el-icon-pie-chart",
          description: "Description of your gig",
        },
        {
          name: "Gig Pricing",
          iconName: "el-icon-money",
          description: "Setup your gig pricing",
        },
        {
          name: "Gig Gallery",
          iconName: "el-icon-copy-document",
          description: "Make your gig attractive",
        },
      ],
      stepperActiveMap: ["gig-overview", "gig-pricing", "gig-gallery"],
    };
  },
  computed: {
    activeStepper() {
      return this.$route.meta?.step || 1;
    },
  },
  methods: {
    gotoStepper(idx) {
      this.$router.push(`/app/gigs/create/${this.stepperActiveMap[idx]}`);
    },
  },
};
</script>

<style lang="scss">
.create__gig__stepper .el-step__title {
  font-weight: 400;
  @include themed() {
    color: t($text-secondary);
  }
}
.create__gig__stepper .el-step__title.is-finish {
  font-weight: 500;
  @include themed() {
    color: t($text-primary);
  }
}
</style>
