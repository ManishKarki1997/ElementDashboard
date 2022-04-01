<template>
  <div class="order__card">
    <!-- <pre>{{ order.status }}</pre> -->
    <div class="order__overview">
      <p>
        <router-link
          :to="`/app/profile/${order.hirer.email.split('@')[0]} `"
          class="party__name"
          >{{ order.hirer.email.split("@")[0] }}</router-link
        >
        ordered a gig from
        <router-link
          :to="`/app/profile/${order.worcker.first_name} ${order.worcker.last_name}`"
          class="party__name"
          >{{ order.worcker.first_name }}
          {{ order.worcker.last_name }}</router-link
        >
        on {{ $utils.dateFns.formatDate(order.created_at) }}
      </p>
    </div>

    <div class="order__card-details">
      <el-dropdown
        @command="handleDropdownCommand"
        class="dropdown__element"
        trigger="click"
        placement="bottom-end"
      >
        <button class="order__menu__btn" size="mini" type="primary">
          <i class="el-icon-more"></i>
        </button>

        <el-dropdown-menu
          class="has-bg has-shadow has-no-padding-block"
          slot="dropdown"
        >
          <el-dropdown-item
            v-for="dropdownItem in dropdownItems"
            :key="dropdownItem.id"
            :command="dropdownItem.command"
            class="c__icon__dropdown__item"
          >
            <font-awesome-icon :icon="dropdownItem.icon" />

            <span>{{ dropdownItem.name }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <div class="user__image">
        <img
          :src="$utils.getAvatarLink(order.worcker.avatar)"
          alt="Worcker Image"
        />
      </div>

      <div class="order__card-info">
        <h4 class="worcker-name">
          {{ order.worcker.first_name }} {{ order.worcker.last_name }}
        </h4>
        <p class="small package__description">
          {{ order.package.description }}
        </p>

        <div class="package__info">
          <p class="package__name">{{ order.package.package_name }}</p>
          <span class="bullet">&bull;</span>
          <p class="package-price">Rs. {{ order.package.amount }}</p>
        </div>

        <el-tag
          class="order__status"
          size="medium"
          :type="orderStatusesMap[order.status].type"
          >{{ orderStatusesMap[order.status].name }}</el-tag
        >
      </div>
    </div>
  </div>
</template>

<script>
import { keyValueMaps } from "@/constants";
export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      orderStatusesMap: keyValueMaps.orderStatusMaps,
      dropdownCommands: {
        VIEW_REQUIREMENTS: "VIEW_REQUIREMENTS",
        VIEW_ORDER: "VIEW_ORDER",
      },
      dropdownItems: [
        {
          id: "view-requirement",
          name: "View Requirements",
          icon: ["far", "question-circle"],
          command: "VIEW_REQUIREMENTS",
        },
        {
          id: "view-order",
          name: "View Order",
          icon: ["fas", "cart-arrow-down"],
          command: "VIEW_ORDER",
        },
      ],
    };
  },
  methods: {
    handleDropdownCommand(command) {
      //   if (command === this.dropdownCommands.VIEW_ORDER) {
      console.log(command);
      //   }
    },
  },
};
</script>

<style lang="scss" scoped>
.order__card {
  max-width: 550px;

  @media (max-width: 768px) {
    max-width: 700px;
  }
  .order__overview {
    .party__name {
      font-weight: 500;
      @include themed() {
        color: t($text-primary);
      }
    }
  }
  .order__card-details {
    position: relative;
    display: flex;
    gap: 1rem;
    margin-top: $spacing-1;
    padding: 1rem;
    transition: all 0.2s ease-in-out;

    @include radius($large);
    @include themed() {
      background-color: t($bg-secondary);
    }

    &:hover {
      @include box-shadow();

      .dropdown__element {
        visibility: visible;
      }
    }

    .dropdown__element {
      position: absolute;
      top: 1rem;
      right: 1rem;
      cursor: pointer;
      visibility: hidden;
    }
    .user__image {
      min-width: 40px;
      min-height: 40px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .order__card-info {
      .worcker-name {
        font-weight: 500;
      }

      .package__description {
        @include line-clamp(1);
      }
    }

    .package__description {
      margin-block: 6px;
      font-size: 0.8rem;

      @include themed() {
        color: t($text-secondary);
      }
    }

    .order__status {
      margin-top: 8px;
    }

    .package__info {
      display: flex;
      align-items: center;
      gap: 8px;

      .package__name {
        font-size: 0.9rem;
        /* color: blue; */
      }
    }
  }
}
</style>
