<template>
  <nav class="get__started__navbar">
    <div class="brand">
      <div class="brand__letter">
        <h1>K</h1>
      </div>
      <p>aido</p>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.get__started__navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;

  .brand {
    display: flex;
    align-items: center;
    gap: 8px;

    p {
      font-size: 1.4rem;
      color: white;
      letter-spacing: 2px;
    }
    .brand__letter {
      background-color: white;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;

      @include radius;

      h1 {
        font-weight: 700;
        font-size: 1.5rem;
        color: $brand-color;
      }
    }
  }
}
</style>
