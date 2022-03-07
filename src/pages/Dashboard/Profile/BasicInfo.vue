<template>
  <div class="profile__basic__info__main">
    <div class="profile__header">
      <div class="header__left">
        <el-avatar
          shape="square"
          :size="80"
          fit="cover"
          src="https://images4.alphacoders.com/165/thumb-1920-165008.jpg"
        ></el-avatar>

        <div class="profile__details">
          <h2>Nico Robin</h2>
          <p>Graphics Designer</p>
        </div>
      </div>
      <div class="header__right">
        <div class="action__buttons">
          <el-button
            type="primary"
            size="small"
            class="custom__btn__with__icon"
          >
            <font-awesome-icon :icon="['fas', 'pen']"></font-awesome-icon>
            <span> Edit Profile </span>
          </el-button>

          <el-button
            @click="onClickSendMessage"
            type="success"
            size="small"
            class="custom__btn__with__icon"
          >
            <font-awesome-icon
              :icon="['fas', 'paper-plane']"
            ></font-awesome-icon>
            <span> Send Message </span>
          </el-button>

          <el-dropdown
            @command="handleDropdownCommand"
            trigger="click"
            placement="bottom-end"
          >
            <el-button size="small">
              <font-awesome-icon :icon="['fas', 'ellipsis-h']" />
            </el-button>

            <el-dropdown-menu
              class="has-bg has-shadow has-no-padding-block"
              slot="dropdown"
            >
              <el-dropdown-item
                v-for="menuOption in profileMenuOptions"
                :key="menuOption.name"
                :command="menuOption.command"
                class="custom_dropdown_item_with_icon"
              >
                <font-awesome-icon :icon="menuOption.icon" />
                <span>{{ menuOption.name }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>

    <div class="user__stats">
      <div
        :style="getStyles(idx)"
        v-for="(stat, idx) in userStats"
        :key="stat.name"
        class="user__stat"
      >
        <div class="icon_wrapper">
          <font-awesome-icon :icon="stat.icon"> </font-awesome-icon>
        </div>
        <div class="stat__details">
          <h2>{{ stat.name }}</h2>
          <p>{{ stat.subtitle }}</p>
        </div>
      </div>
    </div>

    <div class="detailed__profile__info">
      <div class="block__header">
        <h3>User Details</h3>
        <p class="small__secondary">Full profile details of Nico Robin</p>
      </div>

      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6">
          <div class="profile__info__item">
            <label> Name </label>
            <div class="item__value">
              <h4>Nico Robin</h4>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6">
          <div class="profile__info__item">
            <label> Age </label>
            <div class="item__value">
              <h4>32</h4>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6">
          <div class="profile__info__item">
            <label> Alliance </label>
            <div class="item__value">
              <h4>Strawhat Pirates</h4>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6">
          <div class="profile__info__item">
            <label> Birth Place </label>
            <div class="item__value">
              <h4>Ohara</h4>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6">
          <div class="profile__info__item">
            <label> Username </label>
            <div class="item__value">
              <h4>@nicorobinx</h4>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6">
          <div class="profile__info__item">
            <label> Email </label>
            <div class="item__value">
              <h4>nicorobin@strawhats.com</h4>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6">
          <div class="profile__info__item">
            <label> Role </label>
            <div class="item__value">
              <h4>Graphics Designer</h4>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6">
          <div class="profile__info__item">
            <label> Joined Date </label>
            <div class="item__value">
              <h4>July 12, 2014</h4>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <div class="profile__info__item">
            <label> Bio </label>
            <div class="item__value">
              <h4>
                I am so happy, my dear friend, so absorbed in the exquisite
                sense of mere tranquil existence, that I neglect my talents. I
                should be incapable of drawing a single stroke at the present
                moment; and yet I feel that I never was a greater artist than
                now. A wonderful serenity has taken possession of my entire
                soul, like these sweet mornings of spring which I enjoy with my
                whole heart. I am alone, and feel the charm of existence in this
                spot, which was created for the bliss of souls like mine.
              </h4>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { OPEN_SEND_MESSAGE_MODAL } from "@/constants/event-names";

export default {
  data() {
    return {
      statColors: ["#0581FC", "#E12B58", "#21A266", "#D35230"],
      profileMenuOptions: [
        {
          icon: ["fas", "ban"],
          name: "Unverify User",
          command: "TOGGLE_VERIFICATION",
        },
        {
          icon: ["fas", "sort-amount-up"],
          name: "Change Tier",
          command: "CHANGE_TIER",
        },
        {
          icon: ["fas", "paper-plane"],
          name: "Send Message",
          command: "SEND_MESSAGE",
        },
        {
          icon: ["fas", "ban"],
          name: "Block User",
          command: "BLOCK_USER",
        },
      ],
      userStats: [
        {
          name: "200",
          subtitle: "Items Sold",
          icon: ["fas", "rocket"],
        },
        {
          name: "15.5k",
          subtitle: "Amount Earned",
          icon: ["fas", "dollar-sign"],
        },
        {
          name: "19",
          subtitle: "Products On Sale",
          icon: ["fas", "th-large"],
        },
        {
          name: "4.7",
          subtitle: "Average Rating",
          icon: ["far", "star"],
        },
      ],
    };
  },
  methods: {
    handleDropdownCommand(command) {
      console.log(command);
    },
    onClickSendMessage() {
      this.$bus.emit(OPEN_SEND_MESSAGE_MODAL);
    },
    getStyles(index) {
      return {
        "--icon-color": this.statColors[index % this.statColors.length],
        "--bg-color": this.statColors[index % this.statColors.length] + 30,
      };
    },
  },
};
</script>

<style lang="scss">
.profile__basic__info__main {
  .profile__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: $spacing-1;
    margin-bottom: $spacing-2;
    padding: 1rem;

    @include radius($large);
    @include box-shadow();
    @include themed() {
      background-color: t($bg-secondary);
    }

    .header__left {
      display: flex;
      align-items: center;
      gap: $spacing-1;

      .profile__details {
        p {
          @include themed() {
            color: t($text-secondary);
          }
        }
      }
    }

    .header__right {
      padding-top: 6px;

      .action__buttons {
        display: flex;
        align-items: center;
        gap: $spacing-8px;

        .el-button + .el-button {
          margin-left: 0;
        }
      }
    }
  }

  .user__stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-bottom: $spacing-2;

    .user__stat {
      padding: 1rem;
      display: flex;
      gap: $spacing-8px;

      @include radius();
      @include themed() {
        background-color: t($bg-secondary);
      }

      .icon_wrapper {
        background-color: var(--bg-color);
        padding: 8px;
        width: 60px;

        display: flex;
        align-items: center;
        justify-content: center;
        @include radius();

        svg {
          width: 24px;
          height: 24px;
          color: var(--icon-color);
        }
      }

      .stat__details {
        p {
          font-size: 0.9rem;
          @include themed() {
            color: t($text-secondary);
          }
        }
      }
    }
  }

  .detailed__profile__info {
    padding: 1rem;

    .block__header {
      margin-bottom: $spacing-4;
    }

    @include radius();
    @include themed() {
      background-color: t($bg-secondary);
    }

    .el-row {
      margin-bottom: $spacing-2;
    }

    .profile__info__item {
      label {
        margin-bottom: $spacing-4px;
        font-size: 0.9rem;
        @include themed() {
          color: t($text-secondary);
        }
      }
    }
  }
}
</style>
