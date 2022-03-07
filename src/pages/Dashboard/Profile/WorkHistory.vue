<template>
  <div class="work__history">
    <div class="work__grid">
      <div
        v-for="(work, idx) in workHistory"
        :key="work.companyName + '-' + idx"
        class="work__item"
      >
        <div class="work__icon">
          <font-awesome-icon :icon="['fas', 'university']"></font-awesome-icon>
        </div>

        <div class="work__content">
          <h4 class="title">{{ work.designation }}</h4>
          <p class="degree small__secondary">{{ work.companyName }}</p>
        </div>

        <div class="view__button">
          <el-button @click="viewWorkHistory(work)" size="mini">
            <font-awesome-icon :icon="['fas', 'eye']"></font-awesome-icon>
          </el-button>
        </div>
      </div>
    </div>

    <ViewWorkHistoryModal />
  </div>
</template>

<script>
import { OPEN_VIEW_WORK_HISTORY_MODAL } from "@/constants/event-names";

export default {
  components: {
    ViewWorkHistoryModal: () =>
      import("@/components/DialogModals/ViewWorkHistoryModal"),
  },
  data() {
    return {
      workHistory: [
        {
          department: "UI/UX",
          companyName: "United LLC",
          designation: "Software Developer",
          startDate: "April 11, 2002",
          endDate: "March 16, 2008",
        },
        {
          department: "UI/UX",
          companyName: "ASUS Ltd",
          designation: "Frontend Developer",
          startDate: "April 19 2011",
          endDate: "Jan 11, 2012",
        },
        {
          department: "UI/UX",
          companyName: "Standard Chartered",
          designation: "Fullstack Developer",
          startDate: "May 29, 2020",
          endDate: "April 20, 2021",
        },
      ],
    };
  },
  methods: {
    viewWorkHistory(workHistory) {
      this.$bus.emit(OPEN_VIEW_WORK_HISTORY_MODAL, {
        user: {},
        workHistory,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.work__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem 1rem;
}

.work__item {
  padding: 1rem;
  gap: $spacing-1;
  max-width: 400px;
  display: flex;
  align-items: center;
  cursor: pointer;

  @include full-width-touch-devices;
  @include radius();
  @include themed() {
    background-color: t($bg-secondary);
  }

  &:hover {
    @include box-shadow();

    .view__button {
      visibility: visible;
    }
  }

  .work__icon {
    min-width: 60px;
    height: 60px;

    @include all-center;
    @include radius($large);
    @include themed() {
      background-color: t($bg-primary);
    }
  }

  .view__button {
    margin-left: auto;
    visibility: hidden;
  }
}
</style>
