<template>
  <div :class="$style.layout">
    <ElContainer
      direction="vertical"
      :class="$style.layout__container"
    >
      <ElHeader :class="$style.layout__header">
        <LogoIcon
          :class="$style.layout__logo"
          @click="toHome"
        />
      </ElHeader>
      <ElContainer>
        <ElAside
          width="250px"
          :class="$style.layout__aside"
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
import AppAside from '~/components/aside/AppAside'
import LogoIcon from '~/assets/img/logo.svg'

export default {
  name: 'Default',

  middleware: ['auth', 'schema'],

  components: {
    AppAside,
    LogoIcon
  },

  methods: {
    toHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" module>
@import 'assets/scss/_vars';

.layout {
  width: 100%;
  height: 100vh;

  &__container {
    height: 100%;
  }

  &__header {
    display: flex;
    align-items: center;
    z-index: 5;
    background-color: #1c1e24;
    box-shadow: 0px 0px 10px 0px rgba(28, 30, 36, 0.65);

    :global(.logo_svg__fill-logo) {
      fill: $color-primary;
    }

    :global(.logo_svg__stroke-logo) {
      stroke: $color-primary;
    }
  }

  &__logo {
    width: 100px;
    height: 50px;
    cursor: pointer;
  }

  &__aside {
    :global(.el-menu) {
      border-right: none;
      border-top: 1px solid $color-primary;
    }
  }
}
</style>
