<template>
  <ElContainer :class="$style.container">
    <ElCard
      shadow="never"
      :class="$style.card"
    >
      <h2
        slot="header"
        :class="$style.tagline"
      >
        Авторизация на сайте
      </h2>
      <ElForm ref="login">
        <LogoIcon
          width="100%"
          height="100%"
          :class="$style.logo"
        />
        <ElFormItem>
          <ElInput
            v-model.trim="controls.login"
            prefix-icon="el-icon-user"
            :placeholder="'email или телефон'"
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
            :placeholder="'пароль'"
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
        <ElButton
          type="primary"
          :class="$style.button"
          :loading="loading"
        >
          Войти
        </ElButton>
      </ElForm>
    </ElCard>
  </ElContainer>
</template>

<script>
import LogoIcon from '~/assets/img/logo.svg'

export default {
  name: 'Login',
  layout: 'empty',
  components: {
    LogoIcon
  },
  data () {
    return {
      loading: false,
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

  :global(.el-card__header) {
    padding: 12px 0;
    background-color: #f3f3f3;
    border-bottom: 1px solid #cfcfcf;
    box-shadow: 0 1px #f5f5f5;
  }
}

.tagline {
  color: #555;
  font-size: 16px;
  text-align: center;
}

.logo {
  display: block;
  max-width: 220px;
  margin: 0 auto 20px;
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

.button {
  width: 100%;
}
</style>
