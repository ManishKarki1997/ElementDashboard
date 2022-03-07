<template>
  <el-dialog
    title="Education History"
    custom-class="dialog__primary"
    :visible.sync="isEducationHistoryModalActive"
  >
    <div class="items__grid">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6">
          <div class="education__item">
            <label> Title </label>
            <div class="item__value">
              <h4>{{ educationHistory.title }}</h4>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6">
          <div class="education__item">
            <label> Degree </label>
            <div class="item__value">
              <h4>{{ educationHistory.degree }}</h4>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6">
          <div class="education__item">
            <label> Institute </label>
            <div class="item__value">
              <h4>{{ educationHistory.insituteName }}</h4>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6">
          <div class="education__item">
            <label> Graduation Date </label>
            <div class="item__value">
              <h4>{{ educationHistory.graduationDate }}</h4>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6">
          <div class="education__item">
            <label> Country </label>
            <div class="item__value">
              <h4>{{ educationHistory.country }}</h4>
            </div>
          </div>
        </el-col>
        <!-- <el-col :xs="24" :sm="12" :md="12" :lg="6">
          <div class="education__item">
            <label> Attachment </label>
            <div class="item__value">
              <el-button type="primary" size="mini" icon="el-icon-copy-document"
                >View Attachment</el-button
              >
            </div>
          </div>
        </el-col> -->
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import { OPEN_VIEW_EDUCATION_HISTORY_MODAL } from "@/constants/event-names";

export default {
  data() {
    return {
      isEducationHistoryModalActive: false,
      user: {},
      educationHistory: {},
    };
  },
  mounted() {
    this.$bus.on(
      OPEN_VIEW_EDUCATION_HISTORY_MODAL,
      ({ user, educationHistory }) => {
        this.user = { ...user };
        this.educationHistory = { ...educationHistory };
        this.isEducationHistoryModalActive = true;
      }
    );
  },
};
</script>

<style scoped lang="scss">
.el-row {
  margin-bottom: $spacing-2;
}
.education__item {
  label {
    margin-bottom: $spacing-8px;
    font-size: 0.9rem;

    @include themed() {
      color: t($text-secondary);
    }
  }
}
</style>
