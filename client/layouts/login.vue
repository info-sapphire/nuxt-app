<template>
  <div :class="$style.layout">
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'Login',

  middleware: ['isAuth', 'schema']
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
