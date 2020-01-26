<template>
  <div
    :class="$style.layout"
    :style="{ 'background-color': color }"
  >
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'Empty',
  data () {
    return {
      color: '#fff'
    }
  },
  created () {
    this.$nuxt.$on('chnage-background-color', color => {
      this.color = color
    })
  },
  mounted () {
    this.color = '#fff'
  }
}
</script>

<style lang="scss" module>
.layout {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
</style>
