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
      <ElForm
        ref="login"
        :class="$style.form"
      >
        <LogoIcon
          width="100%"
          height="100%"
          :class="$style.logo"
        />
        <ElFormItem>
          <ElInput
            v-model.trim="controls.login"
            :placeholder="'email или телефон'"
          >
            <AwesomeIcon
              slot="prefix"
              :name="'user'"
            />
          </ElInput>
        </ElFormItem>
        <ElFormItem>
          <ElInput
            v-model.trim="controls.passwd"
            :type="passwdType"
            :placeholder="'пароль'"
          >
            <AwesomeIcon
              slot="prefix"
              :name="'lock-alt'"
            />
            <AwesomeIcon
              slot="suffix"
              :key="passwdIcon"
              :name="passwdIcon"
              @click="showPasswd"
            />
          </ElInput>
        </ElFormItem>
        <ElButton
          type="primary"
          :class="$style.button"
          :loading="loading"
          @click="onSubmit"
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
  computed: {
    passwdIcon () {
      return this.passwdView ? 'eye-slash' : 'eye'
    }
  },
  beforeCreate () {
    this.$nuxt.$emit('chnage-background-color', '#202020')
  },
  methods: {
    showPasswd () {
      this.passwdView = !this.passwdView
      this.passwdType = this.passwdView ? 'text' : 'password'
    },
    onSubmit () {
      this.loading = true
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

.form {
  .logo {
    display: block;
    max-width: 220px;
    margin: 0 auto 20px;
  }
  :global(.el-input__inner) {
    text-overflow: ellipsis;
  }
  :global(.el-input__prefix) {
    width: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  :global(.el-input__suffix) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;

    :global(.el-input__suffix-inner) {
      display: flex;

      :global(.awesome-icon) {
        cursor: pointer;
        width: 18px;
        height: 18px;
      }
    }
  }
  :global(.awesome-icon) {
    width: 14px;
    height: 14px;
  }
}

.button {
  width: 100%;
}
</style>
