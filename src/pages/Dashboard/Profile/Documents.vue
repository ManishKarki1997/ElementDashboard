<template>
  <div class="education__history">
    <div class="education__grid">
      <div
        v-for="(document, idx) in documents"
        :key="document.name + '-' + idx"
        class="education__item"
      >
        <div class="education__icon">
          <font-awesome-icon
            :icon="[
              'far',
              document.type === 'Document' ? 'sticky-note' : 'image',
            ]"
          ></font-awesome-icon>
        </div>

        <div class="education__content">
          <h4 class="title">{{ document.name }}</h4>
          <p class="degree small__secondary">{{ document.type }}</p>
        </div>

        <div class="view__button">
          <el-button @click="viewDocument(document)" size="mini">
            <font-awesome-icon :icon="['fas', 'eye']"></font-awesome-icon>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      documents: [
        {
          type: "Document",
          name: "PAN Number",
          url: `https://picsum.photos/seed/mountains/1920/1080`,
        },
        {
          type: "Image",
          name: "Citizenship Front",
          url: `https://picsum.photos/seed/mountains/1920/1080`,
        },
        {
          type: "Image",
          name: "Citizenship Back",
          url: `https://picsum.photos/seed/mountains/1920/1080`,
        },
        {
          type: "Image",
          name: "Passport",
          url: `https://picsum.photos/seed/mountains/1920/1080`,
        },
      ],
    };
  },
  methods: {
    viewDocument(document) {
      window.open(document.url, "_blank");
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
