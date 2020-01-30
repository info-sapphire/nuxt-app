<template>
  <div :class="$style.layout">
    <ElContainer
      direction="vertical"
      :class="$style.container"
    >
      <ElHeader :class="$style.header">
        Header
      </ElHeader>
      <ElContainer>
        <ElAside
          width="250px"
          :class="$style.aside"
        >
          <AppAside />
        </ElAside>
        <ElMain>
          <Nuxt />
        </ElMain>
      </ElContainer>
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
.header {
  z-index: 5;
  background-color: #1c1e24;
  box-shadow: 0px 0px 10px 0px rgba(28, 30, 36, 0.65);
}
.aside {
  :global(.el-menu) {
    border-right: none;
    border-top: 1px solid #ee4070;
  }
}
</style>
