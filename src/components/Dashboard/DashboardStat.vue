<template>
  <div class="dashboard__stats">
    <div class="header">
      <h2>{{ title }}</h2>
    </div>

    <div class="dashboard__grid">
      <div
        :style="getStyles(idx)"
        v-for="(stat, idx) in stats"
        :key="stat.title"
        class="dashboard__stat"
      >
        <div class="stat__icon">
          <!-- <i :class="stat.iconName"></i> -->
          <i class="el-icon-odometer"></i>
        </div>

        <div class="stat__info">
          <p>{{ stat.title }}</p>
          <!-- <h2>{{ stat.prefix }} {{ stat.count }}</h2> -->
          <h2>{{ stat.count }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    stats: {
      required: true,
      validator: (prop) => !prop || Array.isArray(prop),
    },
  },
  data() {
    return {
      statColors: ["#0581FC", "#E12B58", "#21A266", "#D35230"],
      // stats: [
      //   {
      //     title: "Total Clients",
      //     count: 299,
      //     prefix: "",
      //     iconName: "el-icon-user",
      //   },
      //   {
      //     title: "Total Revenue",
      //     count: 379500,
      //     prefix: "$",
      //     iconName: "el-icon-money",
      //   },
      //   {
      //     title: "Average Rating",
      //     count: 4.6,
      //     prefix: "",
      //     iconName: "el-icon-star-off",
      //   },
      //   {
      //     title: "Pro Members",
      //     count: 80,
      //     prefix: "",
      //     iconName: "el-icon-data-line",
      //   },
      // ],
    };
  },
  methods: {
    getStyles(index) {
      return {
        "--bg-color": this.statColors[index % this.statColors.length],
      };
    },
  },
};
</script>
