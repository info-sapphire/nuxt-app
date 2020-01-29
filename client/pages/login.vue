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
            :class="$style.input"
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
            :type="passwdType"
            :placeholder="'Пароль'"
          >
            <div
              slot="append"
              :class="$style['icon-group']"
            >
              <i
                v-show="passwdView"
                :class="['el-icon-minus', $style['icon-minus']]"
              />
              <ElButton
                icon="el-icon-view"
                @click="showPasswd"
              />
            </div>
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
      passwdView: false,
      passwdType: 'password',
      controls: {
        login: '',
        passwd: ''
      }
    }
  },
  beforeCreate () {
    this.$nuxt.$emit('chnage-background-color', '#202020')
  },
  methods: {
    showPasswd () {
      this.passwdView = !this.passwdView
      this.passwdType = this.passwdView ? 'text' : 'password'
    }
  }
}
</script>

<style lang="scss" module>
.container {
  justify-content: center;
  padding: 0 24px;
}

.card {
  width: 420px;
  box-shadow: 0 0 200px rgba(255, 255, 255, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3);
}

.input {
  :global(.el-input__inner) {
    text-overflow: ellipsis;
  }
}

.icon-group {
  position: relative;
}

.icon-minus {
  position: absolute;
  font-size: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(145deg);
  user-select: none;
  pointer-events: none;
}
</style>
