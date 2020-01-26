<template>
  <div :class="$style.layout">
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'Empty'
}
</script>

<style lang="scss" module>
.layout {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
