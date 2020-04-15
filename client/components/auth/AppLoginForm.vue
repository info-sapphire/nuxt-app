<template>
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
    <LogoIcon
      width="100%"
      height="100%"
      :class="$style.logo"
    />
    <AppForm
      ref="authForm"
      :class="$style.form"
      :schema="formSchema"
      :rules="formRule"
      :value="formData"
      :actions="formActions"
      :error="formError"
      @submit="onSubmit"
    />
  </ElCard>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import formErrorHandler from '~/mixins/formErrorHandler'

import LogoIcon from '~/assets/img/logo.svg'
import AppForm from '~/components/form/AppForm'

export default {
  components: {
    LogoIcon,
    AppForm
  },

  mixins: [formErrorHandler],

  data: () => ({
    formError: '',

    formSchema: {},

    formRule: {
      email: [
        { required: true, message: 'Пожалуйста введите email', trigger: 'blur' }
      ],
      passwd: [
        {
          required: true,
          message: 'Пожалуйста введите пароль',
          trigger: 'blur'
        }
      ]
    },

    formData: {
      email: 'ex3xeng@yandex.ru',
      passwd: 'qwerty123'
    },

    formActions: [
      {
        emit: 'submit',
        type: 'primary',
        loading: false,
        validate: true,
        name: 'Войти'
      }
    ]
  }),

  computed: {
    ...mapState('settings', ['schema', 'components'])
  },

  created() {
    const component = this.schema

    this.$set(this.formSchema, 'email', {
      ...component,
      component: 'FormInput',
      position: 1,
      props: { placeholder: 'email' },
      options: [
        { component: 'AwesomeIcon', props: { slot: 'prefix', name: 'user' } }
      ]
    })

    this.$set(this.formSchema, 'passwd', {
      ...component,
      component: 'FormPassword',
      position: 2,
      props: { placeholder: 'пароль' },
      options: [
        {
          component: 'AwesomeIcon',
          props: { slot: 'prefix', name: 'lock-alt' }
        }
      ]
    })
  },

  methods: {
    ...mapActions('auth', ['login']),

    async onSubmit(emitName) {
      const index = this.formActions.findIndex(
        action => action.emit === emitName
      )

      try {
        this.formActions[index].loading = true

        await this.login(this.formData)
        this.$router.push('/')
      } catch (err) {
        const error = this.formatError(err)
        const { message, status } = error.response.data

        this.formError = message

        if (status === 400) {
          const { data } = error.response.data

          if (data.length > 0) {
            const { form } = this.$refs.authForm.$refs
            this.showError(form, data)
          }
        }
      } finally {
        this.formActions[index].loading = false
      }
    }
  }
}
</script>

<style lang="scss" module>
.card {
  width: 420px;

  :global(.el-card__header) {
    padding: 12px 0;
    background-color: #f3f3f3;
    border-bottom: 1px solid #cfcfcf;
    box-shadow: 0 1px #f5f5f5;
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

  .form {
    box-shadow: none;
    border: 0;
    margin: 0;

    :global(.el-card__body) {
      padding: 0;
    }

    :global(.el-button) {
      width: 100%;
    }
  }
}
</style>
