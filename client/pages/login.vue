<template>
  <ElContainer :class="$style.container">
    <ElCard
      shadow="never"
      :class="$style.card"
    >
      <ElForm ref="login">
        <ElFormItem>
          <ElInput
            v-model.trim="controls.login"
            prefix-icon="el-icon-user"
            :placeholder="'Логин, email или телефон'"
          >
            <ElButton
              slot="append"
              icon="el-icon-info"
            />
          </ElInput>
        </ElFormItem>
        <ElFormItem>
          <ElInput
            v-model.trim="controls.passwd"
            prefix-icon="el-icon-lock"
            :placeholder="'Пароль'"
          >
            <ElButton
              slot="append"
              icon="el-icon-info"
            />
          </ElInput>
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
        passwd: ''
      }
    }
  },
  created () {
    this.$nuxt.$emit('chnage-background-color', '#202020')
  }
}
</script>

<style lang="scss" module>
.container {
  justify-content: center;
}

.card {
  box-shadow: 0 0 200px rgba(255, 255, 255, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3);
}
</style>
