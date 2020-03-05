<template>
  <div :class="$style.wrapper">
    <ElDialog
      title="Добавление новой опции"
      :visible.sync="showDialog"
      :show-close="false"
      :class="$style.dialog"
    >
      <AppForm
        ref="dialogForm"
        :schema="formSchema"
        :rules="formRule"
        :value="formData"
        :actions="formActions"
        :error="formError"
        :class="$style.dialog__form"
        @create="onCreate"
      />
    </ElDialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import AppForm from '~/components/admin/form/AppForm'

export default {
  name: 'AppCreateOptionDialog',

  components: {
    AppForm
  },

  data: () => ({
    formSchema: {},
    formRule: { type: [], name: [], label: [] },
    formData: {},
    formActions: [],

    formError: '',
    showDialog: false
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
    showDialog (value) {
      /** reset field [value, error] */
      if (value) {
        this.$nextTick(() => {
          this.$refs.dialogForm.$refs.form.resetFields()
        })
      }
    },

    'formData.type' (value) {
      if (!this.verifyComponents) {
        return
      }

      let component = value
      value = ''
      let label = 'Значение по умолчанию'

      if (this.verifyComponents.includes(component)) {
        if (['FormSelect'].includes(component)) {
          component = 'FormSelectValue'
          value = []
          label = 'Значения'
        }

        /** reset current value for value component */
        this.formData.value = value

        /** change value component */
        this.formSchema.value = {
          ...this.component,
          component,
          label
        }
      }
    }
  },

  created () {
    /** create form schema */
    this.formSchema.type = {
      ...this.component,
      component: 'FormSelect',
      label: 'Компонент',
      options: this.components.map(item => {
        return { label: item.name, value: item.component }
      })
    }

    this.formSchema.name = {
      ...this.component,
      component: 'FormInput',
      label: 'Ключ свойства'
    }

    this.formSchema.label = {
      ...this.component,
      component: 'FormInput',
      label: 'Название свойства'
    }

    /** dynamic schema component */
    this.$set(this.formSchema, 'value', null)

    /** add form rules */
    this.formRule.type.push({ required: true })
    this.formRule.name.push({ required: true, trigger: 'blur' })
    this.formRule.label.push({ required: true, trigger: 'blur' })

    /** add form values */
    this.$set(this.formData, 'type', '')
    this.$set(this.formData, 'name', '')
    this.$set(this.formData, 'label', '')
    /** dynamic component value */
    this.$set(this.formData, 'value', null)

    /** actions */
    this.formActions.push({
      emit: 'create',
      type: 'warning',
      loading: false,
      validate: true,
      name: 'Создать'
    })
  },

  methods: {
    ...mapActions('settings', ['create']),

    async onCreate (emitName) {
      const index = this.formActions.findIndex(
        action => action.emit === emitName
      )

      if (index !== -1) {
        this.formError = ''
        this.formActions[index].loading = true

        let options = []
        let value = ''

        if (this.formSchema.value.component === 'FormSelectValue') {
          /** check to fill all fields label & value */
          if (this.formData.value.length > 0) {
            options = this.formData.value.map(item => {
              return {
                label: item.label,
                value: item.value
              }
            })

            const checkbox = this.formData.value.find(item => item.checked)
            if (checkbox !== undefined) {
              value = checkbox.value
            } else {
              this.formError = 'Выберите значение по умолчанию'
            }

            this.formData.value.forEach(item => {
              const { label, value } = item
              if (!label.length || !value.length) {
                this.formError = 'Заполните все поля значения по умолчанию'
              }
            })
          }
        } else {
          value = this.formData.value
        }

        if (!this.formError.length) {
          const formData = {
            component: this.formData.type,
            name: this.formData.name,
            label: this.formData.label,
            options,
            value
          }

          try {
            await this.create(formData)
          } catch (err) {
            console.error(err)
          }
        }

        this.formActions[index].loading = false
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
