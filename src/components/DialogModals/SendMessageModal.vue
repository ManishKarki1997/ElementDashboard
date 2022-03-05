<template>
  <el-dialog
    title="Send Message"
    custom-class="dialog__primary"
    :visible.sync="isSendMessageModalActive"
  >
    <el-form :rules="rules" ref="form" :model="messageData">
      <el-form-item label="Subject" prop="subject">
        <el-input
          v-model="messageData.subject"
          placeholder="Subject"
        ></el-input>
      </el-form-item>
      <el-form-item label="Message" prop="message">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="Message"
          v-model="messageData.message"
        >
        </el-input>
      </el-form-item>

      <div class="action-buttons">
        <el-button @click="closeModal" size="small">Cancel</el-button>
        <el-button @click="submitForm" size="small" type="primary"
          >Send Message</el-button
        >
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import { OPEN_SEND_MESSAGE_MODAL } from "@/constants/event-names";
export default {
  data() {
    return {
      isSendMessageModalActive: false,
      messageData: {
        subject: "",
        message: "",
      },
      rules: {
        subject: [
          {
            required: true,
            message: "Please enter the subject",
            trigger: "blur",
          },
          {
            min: 10,
            message: "Must be at least 10 characters long",
            trigger: "blur",
          },
        ],
        message: [
          {
            required: true,
            message: "Please enter your message",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.$bus.on(OPEN_SEND_MESSAGE_MODAL, (value) => {
      this.isSendMessageModalActive = value === undefined ? true : value;
    });
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$confirm(
            `Do you really want to send the message`,
            "Send Message",
            {
              confirmButtonText: "Send",
              cancelButtonText: "Cancel",
              type: "info",
              customClass: "dialog__primary",
            }
          ).then(() => {
            this.$message({
              message: "Message sent successfully",
              type: "success",
            });
            this.resetForm();
            this.isSendMessageModalActive = false;
          });
        } else {
          this.$notify({
            title: "Invalid Message Data",
            message:
              "Please make sure to correctly fill in all the message fields",
            type: "error",
          });
          return false;
        }
      });
    },
    closeModal() {
      this.resetForm();
      this.isSendMessageModalActive = false;
    },
    resetForm() {
      this.messageData = {
        subject: "",
        message: "",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.action-buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
