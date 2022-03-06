<template>
  <div class="dashboard__page setup__gig__overview">
    <!-- <div class="create__gig__header">
      <h2>Gig Overview</h2>
      <p>
        Please describe your gig in greater detail so that buyers can better
        find it
      </p>
    </div> -->

    <el-form
      label-position="top"
      ref="createGigOverviewForm"
      :model="form"
      :rules="gigOverviewRules"
    >
      <el-form-item label="Gig Title" prop="title">
        <el-input placeholder="Gig Title" v-model="form.title"></el-input>
      </el-form-item>

      <el-row :gutter="48">
        <el-col :span="12">
          <el-form-item prop="category" label="Select Category">
            <el-select
              v-model="form.category"
              placeholder="Please select a category"
            >
              <el-option
                label="Programming and Tech"
                value="programmingandtech"
              ></el-option>
              <el-option label="Videography" value="videography"></el-option>
              <el-option
                label="Content Writing"
                value="content-writing"
              ></el-option>
              <el-option
                label="Computer Graphics"
                value="computer-graphics"
              ></el-option>
              <el-option
                label="Sports Training"
                value="sports-training"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="service" label="Select Service">
            <el-select
              v-model="form.service"
              placeholder="Please select a service"
            >
              <el-option
                label="Android Development"
                value="android-development"
              ></el-option>
              <el-option
                label="Web Development"
                value="web-development"
              ></el-option>
              <el-option
                label="IOS Development"
                value="ios-development"
              ></el-option>
              <el-option
                label="Software Development"
                value="software-development"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="48">
        <el-col :span="12">
          <el-form-item prop="skills" label="Gig Skills">
            <el-select
              v-model="form.skills"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="Skills Required"
            >
              <el-option
                v-for="item in skillsRequired"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="deliveryDays" label="Delivery Days">
            <el-input v-model="form.deliveryDays"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="Description" prop="description">
        <el-input
          placeholder="Describe your gig in great detail"
          type="textarea"
          v-model="form.description"
          :rows="4"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">Save</el-button>
        <el-button @click="resetForm">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      skillsRequired: [
        {
          value: "HTML",
          label: "HTML",
        },
        {
          value: "CSS",
          label: "CSS",
        },
        {
          value: "JavaScript",
          label: "JavaScript",
        },
      ],
      form: {
        title: "",
        category: "",
        service: "",
        skills: [],
        deliveryDays: "",
        description: "",
      },
      gigOverviewRules: {
        title: [
          {
            required: true,
            message: "Please enter a title for the gig",
            trigger: "blur",
          },
          {
            min: 20,
            max: 400,
            message: "Length should be between 20 and 400",
            trigger: "blur",
          },
        ],
        category: [
          {
            required: true,
            message: "Please select a category for the gig",
            trigger: "blur",
          },
        ],
        service: [
          {
            required: true,
            message: "Please select a service for the gig",
            trigger: "blur",
          },
        ],
        skills: [
          {
            required: true,
            message: "Please enter at least one skills required for the gig",
            trigger: "blur",
          },
        ],
        deliveryDays: [
          {
            required: true,
            message: "Please enter the delivery day for the gig",
            trigger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "Please enter a description of the gig",
            trigger: "blur",
          },
          {
            min: 80,
            max: 1200,
            message: "Length should be between 80 and 1200",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$router.push(`/app/gigs/create/gig-pricing`);
      // this.$refs.createGigOverviewForm.validate((valid) => {
      //   if (valid) {
      //     alert("submit!");
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    resetForm() {
      this.$refs.createGigOverviewForm.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-select {
  display: block;
}
.el-form--label-top {
  padding-bottom: 0;
}

.el-form-item,
.el-row {
  margin-bottom: $spacing-1;
}
.el-form {
  max-width: 99%;
  overflow: hidden;
  padding: 1rem;

  @include radius($large);
  @include themed() {
    background-color: t($bg-secondary);
  }
}
</style>
