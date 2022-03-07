<template>
  <div
    :class="[type === 'overlay' ? 'blog__card-overlay' : null]"
    class="blog__card"
  >
    <div class="blog__card-inner">
      <div class="blog__image__wrapper">
        <img
          class="blog__image"
          src="https://images6.alphacoders.com/120/thumb-1920-1203933.jpg"
          alt="Blog Image"
        />
      </div>

      <div class="blog__card-content">
        <div class="horizontal__center gap-8 blog__meta">
          <router-link to="/" class="blog__category">Guides</router-link>
          <span class="bullet">&bull;</span>
          <p class="time__to__read small__secondary">3 mins</p>
        </div>

        <h2 class="blog__title">
          A wonderful serenity has taken possession of my entire soul
        </h2>

        <div class="author__info__wrapper">
          <el-avatar
            fill="cover"
            shape="circle"
            src="https://images6.alphacoders.com/121/thumb-1920-1217194.png"
          ></el-avatar>

          <div class="author__details">
            <h4 class="author__name">Jupiter</h4>
            <p class="small__secondary">11th Sep, 2022</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "overlay",
    },
  },
};
</script>
