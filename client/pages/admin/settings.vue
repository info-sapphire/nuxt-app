<template>
  <div :class="$style.wrapper">
    <AppPageHeadline
      :breadcrumbs="breadcrumbs"
      :name="page.name"
    />
    <AppForm
      :schema="formSchema"
      :rules="formRule"
      :value="formData"
      :actions="actions"
      @submit="onSubmit"
      @popup="onPopup"
    />
    <ElDialog
      title="Добавление новой опции"
      :visible.sync="dialog.state"
      :show-close="false"
      :class="$style.dialog"
    >
      <AppForm
        ref="dialogForm"
        :schema="dialog.schema"
        :rules="dialog.rule"
        :value="dialog.data"
        :actions="dialog.actions"
        :class="$style.dialog__form"
        @create="onCreate"
      />
    </ElDialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import AppPageHeadline from '~/components/admin/page/AppPageHeadline'
import AppForm from '~/components/admin/form/AppForm'
// import AppButton from '~/components/admin/elements/button/AppButton'

export default {
  layout: 'admin',

  components: {
    AppPageHeadline,
    AppForm
  },

  async asyncData ({ store, params, error }) {
    const settings = await store.dispatch('settings/list')

    const formSchema = {}
    const formRule = {}
    const formData = {}

    if (Object.keys(settings).length > 0) {
      for (const prop in settings) {
        formSchema[prop] = settings[prop]
        formData[prop] = settings[prop].value
      }
    }

    return {
      formSchema,
      formRule,
      formData
    }
  },

  data: () => ({
    page: {
      name: 'Настройки'
    },

    breadcrumbs: [{ name: 'Настройки', link: '' }],

    actions: [],

    dialog: null,

    watch: true
  }),

  computed: {
    ...mapState({
      component: state => state.settings.schema,
      components: state => state.settings.components
    }),

    verifyComponents () {
      return this.components !== null
        ? this.components.map(item => item.component)
        : false
    }
  },

  watch: {
    // formData: {
    //   deep: true,
    //   immediate: true,
    //   handler (value) {
    //     console.log(value)
    //   }
    // },
    dialog: {
      deep: true,
      handler (value) {
        if (
          value.data === undefined ||
          this.verifyComponents === false ||
          this.watch === false
        ) {
          return
        }

        if (this.verifyComponents.includes(value.data.type)) {
          /** stop watching */
          this.watch = false

          /** update component */
          this.dialog.schema.value = {
            ...this.component,
            component: value.data.type,
            label: 'Значение по умолчанию'
          }

          /** start watching */
          this.$nextTick(() => {
            setTimeout(() => {
              this.watch = true
            }, 10)
          })
        }
      }
    }
  },

  created () {
    this.actions.push({
      emit: 'submit',
      type: 'primary',
      loading: false,
      validate: true,
      name: 'Обновить'
    })

    this.actions.push({
      emit: 'popup',
      type: 'warning',
      loading: false,
      validate: false,
      name: 'Добавить настройку'
    })

    this.dialog = {
      state: false
    }

    setTimeout(() => {
      // this.dialog.data.name = 'asdasd'
    }, 5000)
  },

  methods: {
    ...mapActions('settings', ['schema', 'update']),

    onSubmit () {
      this.loading = true
      this.update(this.formData).finally(() => {
        this.loading = false
      })
    },

    onPopup (emitName) {
      const index = this.actions.findIndex(action => action.emit === emitName)

      if (index !== -1) {
        this.actions[index].loading = true
        this.schema().then(() => {
          /** schemas */
          this.$set(this.dialog, 'schema', {
            type: {
              ...this.component,
              component: 'FormSelect',
              label: 'Компонент',
              options: this.components.map(item => {
                return { label: item.name, value: item.component }
              })
            },
            name: {
              ...this.component,
              component: 'FormInput',
              label: 'Ключ свойства'
            },
            label: {
              ...this.component,
              component: 'FormInput',
              label: 'Название свойства'
            },
            /** dynamic schema component */
            value: null
          })

          /** rules */
          this.dialog.rule = {
            type: [{ required: true }],
            name: [{ required: true, trigger: 'blur' }],
            label: [{ required: true, trigger: 'blur' }]
          }

          /** values */
          this.$set(this.dialog, 'data', {
            type: '',
            name: '',
            label: '',
            /** dynamic component value */
            value: ''
          })

          /** actions */
          this.$set(this.dialog, 'actions', [])
          this.dialog.actions.push({
            emit: 'create',
            type: 'success',
            loading: false,
            validate: true,
            name: 'Добавить'
          })

          this.actions[index].loading = false
          /** show dialog */
          this.dialog.state = true

          /** reset field [value, error] */
          if (this.$refs.dialogForm !== undefined) {
            this.$nextTick(() => {
              this.$refs.dialogForm.$refs.form.resetFields()
            })
          }
        })
      }
    },

    onCreate (emitName) {
      const index = this.dialog.actions.findIndex(
        action => action.emit === emitName
      )

      if (index !== -1) {
        this.dialog.actions[index].loading = true

        console.log(this.dialog.data)
      }
    }
  }
}
</script>

<style lang="scss" module>
.wrapper {
  .dialog {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 20px;

    :global(.el-dialog) {
      margin: 0 !important;
      width: 100%;
      max-width: 600px;

      :global(.el-dialog__header) {
        padding-bottom: 0;
      }

      :global(.el-dialog__body) {
        padding: 0;
      }
    }

    &__form {
      :global(.el-card__body) {
        padding-top: 10px;

        :global(.el-form-item__label) {
          line-height: 30px;
        }

        :global(.el-select) {
          width: 100%;
        }
      }
    }
  }
}
</style>
