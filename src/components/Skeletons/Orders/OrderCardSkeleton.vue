<template>
  <el-skeleton
    :animated="true"
    class="order__card-skeleton"
    style="width: 100%; max-width: 500px"
  >
    <template slot="template">
      <el-skeleton class="order__info-skeleton" variant="rect">
        <template slot="template">
          <el-skeleton-item
            class="bg__secondary user__image"
            variant="circle"
          />
          <div class="order__details">
            <el-skeleton-item
              variant="text"
              style="height: 30px; margin-bottom: 4px"
            />
            <el-skeleton-item
              variant="text"
              style="height: 20px; margin-bottom: 4px"
            />
          </div>
        </template>
      </el-skeleton>
    </template>
  </el-skeleton>
</template>

<script>
export default {};
</script>

<style lang="scss">
.order__card-skeleton {
  max-width: 550px;

  @media (max-width: 768px) {
    max-width: 700px;
  }
}
.order__info-skeleton {
  max-width: 500px;
  width: 100%;
  /* height: 180px; */
  @include themed() {
    background: t($bg-secondary);
    padding: 1rem;
  }

  & > div {
    width: 100%;
    display: flex;
    gap: 1rem;
  }

  .user__image {
    min-width: 50px;
    min-height: 50px;
    width: 50px;
    height: 50px;
  }

  .order__details {
    width: 100%;
  }
}
</style>
