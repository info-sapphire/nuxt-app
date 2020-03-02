<template>
  <div :class="$style.layout">
    <!-- :style="{ 'background-color': color }" -->
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'EmptyLogin'

  // data: () => ({
  //   color: null
  // }),

  // created () {
  //   this.color = '#fff'
  //   this.$nuxt.$on('change-background-color', color => {
  //     this.color = color
  //   })
  // }
}
</script>

<style lang="scss" module>
.layout {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #202020;
}
</style>
