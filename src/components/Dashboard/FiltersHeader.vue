<template>
  <div class="filters__header">
    <div class="filters__wrapper horizontal__center gap-12">
      <el-form ref="form" :model="form">
        <el-row :gutter="8">
          <el-col
            v-for="filter in filters"
            :key="filter.name"
            :span="Math.floor(24 / filters.length)"
          >
            <el-form-item :label="filter.name">
              <!-- v-model="filtersForm[filter.formName]" -->
              <el-select
                @change="onSelectChange($event, filter)"
                clearable
                :filterable="filter.isFilterable"
                :loading="filter.isFilterable && !filter.hasFetchedData"
                :placeholder="filter.name"
                :label="filter.name"
                :value="filtersForm[filter.formName]"
              >
                <el-option
                  v-for="item in filter.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="views__wrapper horizontal__center">
      <el-button
        :class="{ active: activeViewTab === 'GRID' }"
        @click="selectActiveUsersTab('GRID')"
        class="icon__button bg__secondary"
        icon="el-icon-menu"
      ></el-button>
      <el-button
        :class="{ active: activeViewTab === 'TABLE' }"
        @click="selectActiveUsersTab('TABLE')"
        class="icon__button bg__secondary"
        icon="el-icon-s-operation"
      ></el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activeViewTab: {
      type: String,
      required: true,
    },
    filters: {
      type: Array,
      required: true,
    },
    filtersForm: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        verificationStatus: "",
        joinedDate: "",
      },
    };
  },
  methods: {
    selectActiveUsersTab(selected) {
      this.$emit("ITEM_VIEW_TAB_ACTIVE", selected);
    },
    onSelectChange($event, filter) {
      this.$emit("ON_SELECT_CHANGE", {
        name: filter.formName,
        value: $event,
        isTypeSort: filter?.isTypeSort,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.filters__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 1rem;

  @include themed() {
    background-color: t($bg-secondary);
  }
  @include radius();
  @include box-shadow();

  margin-bottom: $spacing-2;

  .views__wrapper {
    .el-button {
      background-color: transparent;

      &.active {
        @include themed() {
          background-color: t($bg-secondary);
        }
        color: ($blue-color) !important;
      }
    }
  }
}
</style>
