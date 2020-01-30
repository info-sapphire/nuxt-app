<template>
  <div :class="$style.layout">
    <ElContainer :class="$style.container">
      <ElAside width="250px">
        <AppAside />
      </ElAside>
      <ElMain>
        <Nuxt />
      </ElMain>
    </ElContainer>
  </div>
</template>

<script>
import AppAside from '~/components/admin/AppAside'

export default {
  name: 'Admin',
  components: {
    AppAside
  }
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
