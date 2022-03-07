<template>
  <div class="education__history">
    <div class="education__grid">
      <div
        v-for="education in educationHistory"
        :key="education.title"
        class="education__item"
      >
        <div class="education__icon">
          <font-awesome-icon :icon="['fas', 'university']"></font-awesome-icon>
        </div>

        <div class="education__content">
          <h4 class="title">{{ education.title }}</h4>
          <p class="degree small__secondary">{{ education.degree }}</p>
        </div>

        <div class="view__button">
          <el-button @click="viewEducationHistory(education)" size="mini">
            <font-awesome-icon :icon="['fas', 'eye']"></font-awesome-icon>
          </el-button>
        </div>
      </div>
    </div>

    <ViewEducationHistoryModal />
  </div>
</template>

<script>
import { OPEN_VIEW_EDUCATION_HISTORY_MODAL } from "@/constants/event-names";

export default {
  components: {
    ViewEducationHistoryModal: () =>
      import("@/components/DialogModals/ViewEducationHistoryModal"),
  },
  data() {
    return {
      educationHistory: [
        {
          country: "Nepal",
          insituteName: "Chelsea International",
          title: "A-Level",
          degree: "A-Level",
          graduationDate: "March 16, 2008",
        },
        {
          country: "Nepal",
          insituteName: "Zenith International",
          title: "Bachelor",
          degree: "Computer Science",
          graduationDate: "Jan 11, 2010",
        },
        {
          country: "Scotland",
          insituteName: "Scottish International",
          title: "Masters",
          degree: "Computer Science",
          graduationDate: "April 20, 2019",
        },
      ],
    };
  },
  methods: {
    viewEducationHistory(educationHistory) {
      this.$bus.emit(OPEN_VIEW_EDUCATION_HISTORY_MODAL, {
        user: {},
        educationHistory,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.education__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem 1rem;
}

.education__item {
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

  .education__icon {
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
