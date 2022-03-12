<template>
  <div class="getstarted__page">
    <div class="started__overlay">
      <img
        class="overlay__image"
        src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
        alt="Overlay Image"
      />
      <div class="overlay__content">
        <h2>Login to get started</h2>
        <p>
          Login to your account and get access to all of our free and premium
          features
        </p>
      </div>
    </div>

    <div class="started__form__content">
      <div class="form__content__wrapper">
        <div class="form__header">
          <h2>Login To Your Account</h2>
          <p class="body__secondary">
            Enter your credentials to get into your dashboard
          </p>
        </div>

        <el-form :rules="rules" ref="form" :model="loginData">
          <el-form-item label="Email" prop="email">
            <el-input
              type="email"
              v-model="loginData.email"
              placeholder="Email"
            ></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input
              type="password"
              v-model="loginData.password"
              placeholder="Password"
            ></el-input>
          </el-form-item>

          <div class="form__action">
            <el-button
              @click="submitForm"
              :loading="isLoggingIn"
              size="medium"
              type="primary"
              class="login__btn"
              >Login</el-button
            >
          </div>

          <div class="form__footer">
            <p class="small__secondary">Don't have an account?</p>
            <router-link to="/signup">Signup</router-link>
          </div>
        </el-form>
      </div>
    </div>
    <GetStartedNavbar />
  </div>
</template>

<script>
import GetStartedNavbar from "../components/Navbar/GetStartedNavbar.vue";

export default {
  components: {
    GetStartedNavbar,
  },
  data() {
    return {
      isLoggingIn: false,
      loginData: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Please enter your email",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Email is invalid",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Please enter your password",
            trigger: "blur",
          },
          {
            min: 8,
            message: "Password must be at least 8 characters long",
            trigger: "blur",
          },
          {
            max: 32,
            message: "Password must be not be more than 32 characters long",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.isLoggingIn = true;

          setTimeout(() => {
            this.$message({
              message: "Logged in successfully",
              type: "success",
            });
            this.resetForm();
            this.isLoggingIn = false;
          }, 1500);
        } else {
          this.$notify({
            title: "Invalid Credentials",
            message: "Please check your credentials and try again",
            type: "error",
          });
          return false;
        }
      });
    },
    resetForm() {
      this.loginData = {
        email: "",
        password: "",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.getstarted__page {
  height: 100vh;
  max-height: 100vh;
  overflow-y: hidden;
  display: flex;

  .started__overlay,
  .started__form__content {
    height: 100vh;
    padding: 2rem;
  }
}

.started__overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;

  background-color: $brand-color;
  position: relative;

  .overlay__image {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    opacity: 0.1;
    object-fit: cover;
  }

  .overlay__content {
    position: relative;
    z-index: 10;

    h2 {
      color: white;
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.2rem;
      color: #dedede;
    }
  }
}

.started__form__content {
  width: 65%;

  @include x-center;

  .form__header {
    margin-bottom: $spacing-2;
  }

  .el-form {
    .form__action {
      margin-top: $spacing-2;
      .login__btn {
        width: 100%;
      }
    }

    .form__footer {
      display: flex;
      align-items: center;

      gap: $spacing-1;
      margin-top: $spacing-1;

      a {
        font-size: 0.9rem;
      }
    }
  }
}
</style>
