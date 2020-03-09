<template>
  <div :class="$style.wrapper">
    <ElDialog
      :visible.sync="showDialog"
      :show-close="false"
      :close-on-click-modal="false"
      :class="$style.dialog"
    >
      <div
        slot="title"
        :class="$style.dialog__title"
      >
        <span class="el-dialog__title">Добавление новой группы</span>
        <AwesomeIcon
          :name="'times'"
          :class="$style.dialog__close"
          @click="onClose"
        />
      </div>
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
  name: 'AppCreateGroupDialog',

  components: {
    AppForm
  },

  props: {
    position: {
      type: Number,
      required: true
    }
  },

  data: () => ({
    formSchema: {},
    formRule: { name: [], key: [], description: [] },
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
    }
  },

  created () {
    /** create form schema */
    this.formSchema.name = {
      ...this.component,
      component: 'FormInput',
      label: 'Имя группы',
      position: 0
    }

    this.formSchema.key = {
      ...this.component,
      component: 'FormInput',
      label: 'Ключ группы',
      position: 1
    }

    this.formSchema.description = {
      ...this.component,
      component: 'FormInput',
      label: 'Описание группы',
      props: { type: 'textarea', rows: 4, resize: 'none' },
      position: 2
    }

    /** add form rules */
    this.formRule.name.push({ required: true })
    this.formRule.key.push({ required: true, trigger: 'blur' })

    /** add form values */
    this.$set(this.formData, 'name', '')
    this.$set(this.formData, 'key', '')
    this.$set(this.formData, 'description', '')

    /** actions */
    this.formActions.push({
      emit: 'create',
      type: 'success',
      loading: false,
      validate: true,
      name: 'Добавить'
    })
  },

  methods: {
    ...mapActions('users', ['createGroup']),

    onClose () {
      this.showDialog = false
    },

    async onCreate (emitName) {
      const index = this.formActions.findIndex(
        action => action.emit === emitName
      )

      if (index !== -1) {
        this.formError = ''
        this.formActions[index].loading = true

        if (!this.formError.length) {
          try {
            await this.createGroup({
              ...this.formData,
              position: this.position
            })
            this.$message({
              message: 'Группа успешно добавлена',
              type: 'success'
            })
          } catch (err) {
            console.error(err)
            this.$message({
              message: err.message,
              type: 'error'
            })
          }
        }

        this.showDialog = false
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

    &__title {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__close {
      width: 15px;
      height: 15px;
      cursor: pointer;
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
