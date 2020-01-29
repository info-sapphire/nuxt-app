<template>
  <div :class="$style.layout">
    <ElContainer :class="$style.container">
      <ElAside width="250px" />
      <ElMain>
        <Nuxt />
      </ElMain>
    </ElContainer>
  </div>
</template>

<script>
export default {
  name: 'Admin'
}
</script>

<style lang="scss" module>
.layout {
  width: 100%;
  height: 100vh;
}
.container {
  height: 100%;
}
</style>
