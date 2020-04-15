<template>
  <ElContainer :class="$style.container">
    <AppLoginForm />
  </ElContainer>
</template>

<script>
import AppLoginForm from '~/components/auth/AppLoginForm'

export default {
  name: 'Login',

  layout: 'login',

  components: {
    AppLoginForm
  }
}
</script>

<style lang="scss" module>
@import 'assets/scss/_vars';

.container {
  justify-content: center;
}
</style>
