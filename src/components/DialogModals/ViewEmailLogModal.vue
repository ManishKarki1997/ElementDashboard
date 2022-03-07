<template>
  <el-dialog
    title="Email Log"
    custom-class="dialog__primary"
    :visible.sync="isEmailLogModalActive"
  >
    <div class="items__grid">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="12">
          <div class="log__item">
            <label> Subject </label>
            <div class="item__value">
              <h4>{{ emailLog.subject }}</h4>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12">
          <div class="log__item">
            <label> Sent At </label>
            <div class="item__value">
              <h4>{{ emailLog.sentDate }}</h4>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xs="24" :sm="12" :md="12" :lg="24">
          <div class="log__item message">
            <label> Message </label>
            <div class="item__value">
              <h4>{{ emailLog.message }}</h4>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import { OPEN_VIEW_EMAIL_LOG_MODAL } from "@/constants/event-names";

export default {
  data() {
    return {
      isEmailLogModalActive: false,
      user: {},
      emailLog: {},
    };
  },
  mounted() {
    this.$bus.on(OPEN_VIEW_EMAIL_LOG_MODAL, ({ user, emailLog }) => {
      this.user = { ...user };
      this.emailLog = { ...emailLog };
      this.isEmailLogModalActive = true;
    });
  },
};
</script>

<style scoped lang="scss">
.el-row {
  margin-bottom: $spacing-2;
}
.log__item {
  label {
    margin-bottom: $spacing-8px;
    font-size: 0.9rem;

    @include themed() {
      color: t($text-secondary);
    }
  }

  &.message {
    .item__value h4 {
      line-height: 1.8;
    }
  }
}
</style>
