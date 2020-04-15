<template>
  <div :class="$style.wrapper">
    <AppDialog
      :name="dialogName"
      @close="closeDialog"
    >
      <template slot="title">
        Добавление новой группы
      </template>
      <AppForm
        ref="dialogForm"
        :schema="formSchema"
        :rules="formRule"
        :value="formData"
        :actions="formActions"
        :error="formError"
        :class="$style.wrapper__form"
        @create="onCreate"
      />
    </AppDialog>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

import components from '~/mixins/components'

import AppDialog from '~/components/dialog/AppDialog'
import AppForm from '~/components/form/AppForm'

export default {
  name: 'AppCreateSettings',

  components: {
    AppDialog,
    AppForm
  },

  mixins: [components],

  data: () => ({
    formSchema: {},
    formRule: { type: [], name: [], label: [] },
    formData: {},
    formActions: [],

    formError: '',
    dialogName: 'createSettings'
  }),

  watch: {
    'formData.type'(value) {
      if (!this.verifyComponents) {
        return
      }

      let component = value
      let label = 'Значение по умолчанию'
      value = ''

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
          label,
          position: 3
        }
      }
    }
  },

  created() {
    /** create form schema */
    this.formSchema.type = {
      ...this.component,
      component: 'FormSelect',
      label: 'Компонент',
      options: this.components.map(item => {
        return { label: item.name, value: item.component }
      }),
      position: 0
    }

    this.formSchema.name = {
      ...this.component,
      component: 'FormInput',
      label: 'Ключ свойства',
      position: 1
    }

    this.formSchema.label = {
      ...this.component,
      component: 'FormInput',
      label: 'Название свойства',
      position: 2
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
      name: 'Добавить'
    })
  },

  methods: {
    ...mapMutations('app', ['CLOSE_DIALOG']),
    ...mapActions('settings', ['create']),

    closeDialog() {
      this.CLOSE_DIALOG(this.dialogName)

      this.$nextTick(() => {
        this.$refs.dialogForm.$refs.form.resetFields()
      })
    },

    validateSelectValue(value) {
      if (value.length === 0) {
        throw new Error('Добавьте хотя бы одно значение')
      }

      let error = false

      /* clear error's */
      value.forEach(item => {
        item.errorLabel = item.errorValue = error
      })

      value.forEach(item => {
        const { label, value } = item
        if (!label.length || !value.length) {
          error = true
        }

        if (!label.length) {
          item.errorLabel = true
        }

        if (!value.length) {
          item.errorValue = true
        }
      })

      if (error) {
        throw new Error('Заполните все поля')
      }

      const checkbox = value.find(item => item.checked)
      if (checkbox !== undefined) {
        return checkbox.value
      } else {
        throw new Error('Выберите значение по умолчанию')
      }
    },

    async onCreate(emitName) {
      const index = this.formActions.findIndex(
        action => action.emit === emitName
      )

      if (index === -1) {
        return false
      }

      this.formError = ''

      let options = []
      let value = ''

      if (this.formSchema.value.component === 'FormSelectValue') {
        try {
          value = this.validateSelectValue(this.formData.value)

          options = this.formData.value.map(item => {
            return {
              label: item.label,
              value: item.value
            }
          })
        } catch (error) {
          this.formError = error.message
          return false
        }
      } else {
        value = this.formData.value
      }

      if (!this.formError.length) {
        this.formActions[index].loading = true

        const formData = {
          component: this.formData.type,
          name: this.formData.name,
          label: this.formData.label,
          options,
          value
        }

        try {
          await this.create(formData)

          this.closeDialog()

          this.$message({
            message: 'Настройка успешно добавлена',
            type: 'success'
          })
        } catch (err) {
          this.$message({
            message: err.response.data.message,
            type: 'error'
          })
        } finally {
          this.formActions[index].loading = false
        }
      }
    }
  }
}
</script>

<style lang="scss" module>
.wrapper {
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
</style>
