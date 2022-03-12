<template>
  <div class="dashboard__page dashboard-index">
    <DashboardStat :stats="accountStats" title="Account Metrics" />
    <DashboardStat :stats="stats" title="Dashboard Metrics" />

    <div class="dashboard__grid__item">
      <div class="item__left table__wrapper">
        <div class="grid__title">
          <h2>Recent Activities</h2>
        </div>

        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="user" label="User" width="180">
            <template slot-scope="scope">
              <div class="user__profile">
                <img :src="scope.row.user.image" alt="User Avatar" />
                <!-- <h5>{{ scope.row.user.name }}</h5> -->
                <router-link to="/app/profile/starscream">{{
                  scope.row.user.name
                }}</router-link>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="productName" label="Name" width="180">
            <template slot-scope="scope">
              <h5>{{ scope.row.productName }}</h5>
            </template>
          </el-table-column>

          <el-table-column prop="amount" label="Amount">
            <template slot-scope="scope">
              <h5>{{ scope.row.amount }}</h5>
            </template>
          </el-table-column>

          <el-table-column prop="date" label="Purchased Date">
            <template slot-scope="scope">
              <h5>{{ scope.row.date }}</h5>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="item__right events__wrapper">
        <div class="grid__title">
          <h2>Upcoming Events</h2>
        </div>

        <ul class="dashboard__events">
          <li
            :style="getEventColors(idx)"
            class="dashboard__event"
            v-for="(event, idx) in events"
            :key="event.id"
          >
            <div class="event__day">
              <h4>{{ event.day }}</h4>
              <p class="day__name">{{ event.dayName }}</p>
            </div>

            <div class="event__content">
              <h4 class="event__title">{{ event.title }}</h4>
              <p class="event__subtitle">{{ event.subtitle }}</p>
              <div class="event__time">
                <p>{{ event.time }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {
    DashboardStat: () => import("@/components/Dashboard/DashboardStat"),
  },
  data() {
    return {
      tableData: [],
      events: [],
      eventColors: ["#0581FC", "#E12B58", "#21A266", "#D35230", "#E0AA34"],
    };
  },
  computed: {
    ...mapState("user", ["stats", "accountStats"]),
  },
  methods: {
    getEventColors(idx) {
      return {
        "--bg-color": this.eventColors[idx % this.eventColors.length],
        "--bg-color--light":
          this.eventColors[idx & this.eventColors.length] + "40",
      };
    },
    generateTableData() {
      this.tableData = Array.from(Array(8).keys()).map((idx) => ({
        user: {
          name: `User ${idx + 1}`,
          image: `https://avatars.dicebear.com/api/adventurer/${idx * 10}.svg`,
        },
        productName: `Samsung Galaxy S${idx + 1}`,
        amount: "$" + (Math.random() * 200).toFixed(1),
        date: `April ${idx + 1}, 2022`,
      }));
    },
    generateEvents() {
      this.events = Array.from(Array(4).keys()).map((idx) => ({
        id: `event-${idx + 1}`,
        dayName: "Mon",
        day: idx + 5,
        title: `Far Far Away ${idx + 1}`,
        subtitle:
          "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring ",
        time: `${idx + 1}0:00`,
      }));
    },
    getAccountStats() {
      return this.$api.get("/account-stats");
    },
    getStats() {
      return this.$api.get("/stats");
    },
    async fetchStats() {
      try {
        const [accountStatsRes, statsRes] = await Promise.allSettled([
          this.getAccountStats(),
          this.getStats(),
        ]);

        if (accountStatsRes.status === "fulfilled") {
          this.$store.commit(
            this.$mutationConstants.dashboard.SET_ACCOUNT_STATS,
            accountStatsRes.value
          );
        }
        if (statsRes.status === "fulfilled") {
          this.$store.commit(
            this.$mutationConstants.dashboard.SET_STATS,
            statsRes.value
          );
        }
      } catch (err) {
        if (err) {
          console.log(err);
        }
      }
    },
  },
  mounted() {
    this.generateTableData();
    this.generateEvents();
    // this.fetchStats();
  },
};
</script>

<style lang="scss" scoped></style>

<style lang="scss">
.dashboard__grid__item {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;

  .grid__title {
    margin-bottom: 2rem;
  }

  .table__wrapper {
    grid-column: span 7;

    @include themed() {
      background-color: t($bg-secondary);
    }

    @media (max-width: 1400px) {
      grid-column: span 12;
    }

    .grid__title {
      padding: 8px;
      margin-bottom: 0.8rem;
    }

    td {
      .cell {
        & > * {
          font-size: 0.9rem;
          font-weight: 400;

          @include themed() {
            color: t($text-secondary);
          }
        }
      }
    }

    .user__profile {
      display: flex;
      align-items: center;
      gap: 8px;

      img {
        width: 40px;
        height: 40px;
        object-fit: cover;
        @include themed() {
          background-color: t($bg-icon-button);
        }

        @include radius($normal);
      }

      h5 {
        font-size: 0.9rem;
        font-weight: 500;
      }
    }
  }

  .events__wrapper {
    grid-column: span 5;
    padding: 8px;
    width: 100%;

    @include themed() {
      background-color: t($bg-secondary);
    }

    @include radius($normal);

    @media (max-width: 1400px) {
      grid-column: span 12;
    }

    .grid__title {
      padding: 4px 12px;
      margin-bottom: 1rem;
    }

    .dashboard__events {
      .dashboard__event {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
        padding: 8px;
        cursor: pointer;

        &:hover {
          @include themed() {
            background-color: t($bg-icon-button);
          }
        }

        .event__day {
          min-width: 90px;
          min-height: 60px;
          max-height: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-color);

          @include radius($normal);

          h4 {
            font-weight: 500;
            font-size: 1.6rem;
            color: white;
          }

          p {
            color: rgb(231, 224, 224);
          }
        }

        .event__content {
          .event__title {
            font-weight: 500;
            margin-bottom: 4px;
          }

          .event__subtitle {
            font-size: 0.8rem;
            margin-bottom: 4px;
            @include themed() {
              color: t($text-secondary);
            }
          }

          .event__time {
            background-color: var(--bg-color--light);
            width: max-content;
            padding: 2px 12px;
            color: var(--bg-color);
            font-size: 0.9rem;
            @include radius($large);
          }
        }
      }
    }
  }
}
</style>
