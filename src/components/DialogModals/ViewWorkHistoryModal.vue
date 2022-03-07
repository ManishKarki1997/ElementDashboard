<template>
  <el-dialog
    title="Work History"
    custom-class="dialog__primary"
    :visible.sync="isWorkHistoryModalActive"
  >
    <div class="items__grid">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="8">
          <div class="work__item">
            <label> Designation </label>
            <div class="item__value">
              <h4>{{ workHistory.designation }}</h4>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8">
          <div class="work__item">
            <label> Company </label>
            <div class="item__value">
              <h4>{{ workHistory.companyName }}</h4>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8">
          <div class="work__item">
            <label> Department </label>
            <div class="item__value">
              <h4>{{ workHistory.department }}</h4>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xs="24" :sm="12" :md="12" :lg="8">
          <div class="work__item">
            <label> Started From </label>
            <div class="item__value">
              <h4>{{ workHistory.startDate }}</h4>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8">
          <div class="work__item">
            <label> Ended At </label>
            <div class="item__value">
              <h4>{{ workHistory.endDate }}</h4>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import { OPEN_VIEW_WORK_HISTORY_MODAL } from "@/constants/event-names";

export default {
  data() {
    return {
      isWorkHistoryModalActive: false,
      user: {},
      workHistory: {},
    };
  },
  mounted() {
    this.$bus.on(OPEN_VIEW_WORK_HISTORY_MODAL, ({ user, workHistory }) => {
      this.user = { ...user };
      this.workHistory = { ...workHistory };
      this.isWorkHistoryModalActive = true;
    });
  },
};
</script>

<style scoped lang="scss">
.el-row {
  margin-bottom: $spacing-2;
}
.work__item {
  label {
    margin-bottom: $spacing-8px;
    font-size: 0.9rem;

    @include themed() {
      color: t($text-secondary);
    }
  }
}
</style>
