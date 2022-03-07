<template>
  <div class="email__logs">
    <div class="logs__grid">
      <div
        v-for="log in emailLogs"
        :key="log.subject + log.sentDate"
        class="log__item"
      >
        <div class="email__icon">
          <font-awesome-icon
            :icon="['fas', 'envelope-open']"
          ></font-awesome-icon>
        </div>

        <div class="log__content">
          <h4 class="title">{{ log.subject }}</h4>
          <p class="small__secondary">{{ log.sentDate }}</p>
        </div>

        <div class="view__button">
          <el-button @click="viewEmailLog(log)" size="mini">
            <font-awesome-icon :icon="['fas', 'eye']"></font-awesome-icon>
          </el-button>
        </div>
      </div>
    </div>

    <ViewEmailLogModal />
  </div>
</template>

<script>
import { OPEN_VIEW_EMAIL_LOG_MODAL } from "@/constants/event-names";

export default {
  components: {
    ViewEmailLogModal: () =>
      import("@/components/DialogModals/ViewEmailLogModal"),
  },
  data() {
    return {
      emailLogs: [
        {
          subject: "Email Verification",
          sentDate: "July 19, 2020",
          message: `
         A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine.
         
        I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now.
         `,
        },
        {
          subject: "Application Submission",
          sentDate: "July 20, 2020",
          message: `
         When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own image, and the breath of that universal love which bears and sustains us, as it floats around us in an eternity of bliss; and then, my friend, when darkness overspreads my eyes, and heaven and earth seem to dwell in my soul and absorb its power, like the form of a beloved mistress, then I often think with longing, Oh, would I could describe these conceptions, could impress upon paper all that is living so full and warm within me, that it might be the mirror of my soul, as my soul is the mirror of the infinite God!
         `,
        },
        {
          subject: "Application Verified",
          sentDate: "July 24, 2020",
          message: `
         Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia.
         `,
        },
        {
          subject: "Gig Verified",
          sentDate: "July 30, 2020",
          message: `
         It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.

          The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way.

          When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued her way.
         `,
        },
      ],
    };
  },
  methods: {
    viewEmailLog(emailLog) {
      this.$bus.emit(OPEN_VIEW_EMAIL_LOG_MODAL, {
        user: {},
        emailLog,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.logs__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem 1rem;
}

.log__item {
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

  .email__icon {
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
