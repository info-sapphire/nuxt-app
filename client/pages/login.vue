<template>
  <ElContainer>
    <ElCard shadow="always">
      <ElForm ref="login">
        <ElFormItem label="Логин">
          <ElInput v-model.trim="controls.login" />
        </ElFormItem>
      </ElForm>
    </ElCard>
  </ElContainer>
</template>

<script>
export default {
  name: 'Login',
  layout: 'empty',
  data () {
    return {
      controls: {
        login: '',
        password: ''
      }
    }
  },
  created () {
    this.$nuxt.$emit('chnage-background-color', '#202020')
  }
}
</script>

<style lang="scss" module></style>
