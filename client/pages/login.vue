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
        ref="authForm"
        :class="$style.form"
        :model="controls"
        :rules="rules"
      >
        <LogoIcon
          width="100%"
          height="100%"
          :class="$style.logo"
        />
        <ElFormItem prop="email">
          <ElInput
            v-model.trim="controls.email"
            :placeholder="'email'"
          >
            <AwesomeIcon
              slot="prefix"
              :name="'user'"
            />
          </ElInput>
        </ElFormItem>
        <ElFormItem prop="passwd">
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
        <AppButton
          type="primary"
          :class="$style.button"
          :loading="loading"
          @click="onSubmit"
        >
          Войти
        </AppButton>
      </ElForm>
    </ElCard>
  </ElContainer>
</template>

<script>
import { mapActions } from 'vuex'

import AppButton from '~/components/admin/elements/button/AppButton'
import LogoIcon from '~/assets/img/logo.svg'

export default {
  name: 'Login',

  layout: 'emptyLogin',

  components: {
    AppButton,
    LogoIcon
  },

  data: () => ({
    loading: false,
    passwdView: false,
    passwdType: 'password',
    controls: {
      email: '',
      passwd: ''
    },
    rules: {
      email: [
        { required: true, message: 'Пожалуйста введите email', trigger: 'blur' }
      ],
      passwd: [
        {
          required: true,
          message: 'Пожалуйста введите пароль',
          trigger: 'blur'
        },
        { min: 3, message: 'Длина должна быть больше 3х', trigger: 'blur' }
      ]
    }
  }),

  computed: {
    passwdIcon () {
      return this.passwdView ? 'eye-slash' : 'eye'
    }
  },

  // beforeCreate () {
  //   this.$nuxt.$emit('change-background-color', '#202020')
  // },

  methods: {
    ...mapActions('auth', ['login']),

    showPasswd () {
      this.passwdView = !this.passwdView
      this.passwdType = this.passwdView ? 'text' : 'password'
    },

    showError (prop, message) {
      const field = this.$refs.authForm.fields.find(
        field => field.prop === prop
      )
      if (field) {
        field.validateMessage = message
        field.validateState = 'error'
      }
    },

    onSubmit () {
      this.$refs.authForm.validate(async valid => {
        if (valid) {
          try {
            this.loading = true

            await this.login(this.controls)
          } catch (error) {
            this.error = error.response.data.message

            if (error.response.data.status === 400) {
              const { data } = error.response.data

              if (data.length > 0) {
                data.forEach(item => {
                  this.showError(item.param, item.msg)
                })
              }
            }
          } finally {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" module>
@import 'assets/scss/_vars';

.container {
  justify-content: center;

  @media (max-width: $--xs) {
    padding: 0 20px;
  }
}

.card {
  width: 420px;
  // box-shadow: 0 0 200px rgba(255, 255, 255, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3);

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
