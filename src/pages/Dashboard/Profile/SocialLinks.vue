<template>
  <div class="social__links__component">
    <div class="social__links__grid">
      <div
        v-for="social in socialLinks"
        :key="social.name"
        class="social__link"
      >
        <div class="social__icon">
          <font-awesome-icon :icon="['far', 'dot-circle']"></font-awesome-icon>
        </div>
        <div class="social__content">
          <div
            :class="[social.isVerified ? 'verified' : 'unverified']"
            class="name__wrapper horizontal__center"
          >
            <h4 class="social__name">{{ social.name }}</h4>
            <font-awesome-icon
              :icon="[
                'far',
                social.isVerified ? 'check-circle' : 'times-circle',
              ]"
            ></font-awesome-icon>
          </div>
          <el-button
            @click="toggleVerification(social)"
            :type="social.isVerified ? 'danger' : 'primary'"
            size="mini"
            >{{ social.isVerified ? "Unverify" : "Verify" }}</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      socialLinks: [
        {
          name: "Twitter",
          isVerified: true,
        },
        {
          name: "Facebook",
          isVerified: false,
        },
        {
          name: "LinkedIn",
          isVerified: true,
        },
        {
          name: "Reddit",
          isVerified: true,
        },
      ],
    };
  },
  methods: {
    toggleVerification(social) {
      this.$confirm(
        `Do you really want to ${
          social.isVerified ? "unverify" : "verify"
        } this social link?`,
        `${social.isVerified ? "Unverify" : "Verify"} this social link?`,
        {
          confirmButtonText: social.isVerified ? "Unverify" : "Verify",
          cancelButtonText: "Cancel",
          type: social.isVerified ? "error" : "primary",
          customClass: social.isVerified ? "dialog__danger" : "dialog__primary",
        }
      ).then(() => {
        this.socialLinks = this.socialLinks.map((s) =>
          s.name === social.name ? { ...s, isVerified: !social.isVerified } : s
        );

        this.$message({
          message: `${
            social.isVerified
              ? "Social link unverified successfully"
              : "Social link verified successfully"
          }`,
          type: "success",
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.social__links__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 2rem 1rem;
}

.social__link {
  padding: 1rem;
  gap: $spacing-1;
  max-width: 300px;
  cursor: pointer;
  display: flex;

  @include full-width-touch-devices;
  @include radius();
  @include themed() {
    background-color: t($bg-secondary);
  }

  &:hover {
    @include box-shadow();
  }

  .social__icon {
    min-width: 60px;

    @include all-center;
    @include radius($large);
    @include themed() {
      background-color: t($bg-primary);
    }
  }

  .social__content {
    .name__wrapper {
      gap: $spacing-8px;
      margin-bottom: $spacing-8px;

      &.verified {
        svg {
          color: $green-color;
        }
      }
      &.unverified {
        svg {
          color: $red-color;
        }
      }
    }
  }
}
</style>
