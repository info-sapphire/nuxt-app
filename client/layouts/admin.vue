<template>
  <div :class="$style.layout">
    <ElContainer
      direction="vertical"
      :class="$style.container"
    >
      <ElHeader :class="$style.header">
        <LogoIcon
          width="100px"
          height="50px"
        />
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
import LogoIcon from '~/assets/img/logo.svg'

export default {
  name: 'Admin',
  components: {
    AppAside,
    LogoIcon
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
  display: flex;
  align-items: center;
  z-index: 5;
  background-color: #1c1e24;
  box-shadow: 0px 0px 10px 0px rgba(28, 30, 36, 0.65);

  :global(.logo_svg__fill-logo) {
    fill: #ee4070;
  }

  :global(.logo_svg__stroke-logo) {
    stroke: #ee4070;
  }
}
.aside {
  :global(.el-menu) {
    border-right: none;
    border-top: 1px solid #ee4070;
  }
}
</style>
