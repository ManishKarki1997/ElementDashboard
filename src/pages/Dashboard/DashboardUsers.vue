<template>
  <div class="dashboard__page">
    <div class="filters__header">
      <div class="filters__wrapper horizontal__center gap-12">
        <el-form ref="form" :model="form">
          <el-row :gutter="8">
            <el-col v-for="filter in filters" :key="filter.name" :span="12">
              <el-form-item :label="filter.name">
                <el-select
                  v-model="form[filter.formName]"
                  clearable
                  :placeholder="filter.name"
                  :label="filter.name"
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

      <div class="views__wrapper horizontal__center gap-12">
        <el-button
          class="icon__button bg__secondary"
          icon="el-icon-menu"
        ></el-button>
        <el-button
          class="icon__button bg__secondary"
          icon="el-icon-s-operation"
        ></el-button>
      </div>
    </div>

    <div class="user__content__wrapper">
      <div class="user__grid__wrapper">
        <UserCompactCard
          v-for="(user, idx) in users"
          :key="user.name + idx"
          :user="user"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    UserCompactCard: () => import("@/components/User/UserCompactCard"),
  },
  data() {
    return {
      users: [
        {
          verified: Math.random() < 0.5,
          rating: Math.floor(Math.random() * 3 + 1),
          joinedDate: Math.round(Math.random() * 9 + 2) + " months ago",
          name: "Victoria Wilkiins",
          email: "victoriawilkins@gmail.com",
          role: "CEO",
        },
        {
          verified: Math.random() < 0.5,
          rating: Math.floor(Math.random() * 3 + 1),
          joinedDate: Math.round(Math.random() * 9 + 2) + " months ago",
          name: "Hannah Par",
          email: "hannahpar@gmail.com",
          role: "Project Manager",
        },
        {
          verified: Math.random() < 0.5,
          rating: Math.floor(Math.random() * 3 + 1),
          joinedDate: Math.round(Math.random() * 9 + 2) + " months ago",
          name: "Adrian	Peake",
          email: "adrianpeake@gmail.com",
          role: "Frontend Developer",
        },
        {
          verified: Math.random() < 0.5,
          rating: Math.floor(Math.random() * 3 + 1),
          joinedDate: Math.round(Math.random() * 9 + 2) + " months ago",
          name: "Stephen Churchill",
          email: "stephenchurhcill@gmail.com",
          role: "Graphics Designer",
        },
        {
          verified: Math.random() < 0.5,
          rating: Math.floor(Math.random() * 3 + 1),
          joinedDate: Math.round(Math.random() * 9 + 2) + " months ago",
          name: "Andrea Duncan",
          email: "andreaduncan@gmail.com",
          role: "Backend Developer",
        },
        {
          verified: Math.random() < 0.5,
          rating: Math.floor(Math.random() * 3 + 1),
          joinedDate: Math.round(Math.random() * 9 + 2) + " months ago",
          name: "Edward Cameron",
          email: "edwardcameron@gmail.com",
          role: "Backend Developer",
        },
        {
          verified: Math.random() < 0.5,
          rating: Math.floor(Math.random() * 3 + 1),
          joinedDate: Math.round(Math.random() * 9 + 2) + " months ago",
          name: "Carl Bell",
          email: "carlbell@gmail.com",
          role: "Frontend Developer",
        },
        {
          verified: Math.random() < 0.5,
          rating: Math.floor(Math.random() * 3 + 1),
          joinedDate: Math.round(Math.random() * 9 + 2) + " months ago",
          name: "Pippa Reid",
          email: "pippareid@gmail.com",
          role: "Marketing Manager",
        },
        {
          verified: Math.random() < 0.5,
          rating: Math.floor(Math.random() * 3 + 1),
          joinedDate: Math.round(Math.random() * 9 + 2) + " months ago",
          name: "Wendy Wright",
          email: "wendyright@gmail.com",
          role: "Hiring Manager",
        },
      ],
      filters: [
        {
          formName: "verificationStatus",

          name: "Verification Status",
          options: [
            {
              label: "Verified",
              value: "verified",
            },
            {
              label: "Unverified",
              value: "unverified",
            },
          ],
        },
        {
          formName: "joinedDate",

          name: "Joined Date",
          options: [
            {
              label: "Latest",
              value: "created_at:desc",
            },
            {
              label: "Oldest",
              value: "created_at:asc",
            },
          ],
        },
      ],
      form: {
        verificationStatus: "",
        joinedDate: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
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

  @include spacing($spacing-2, "margin-bottom");
}
.user__grid__wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
</style>
