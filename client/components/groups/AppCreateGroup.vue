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
  name: 'AppCreateGroup',

  components: {
    AppDialog,
    AppForm
  },

  mixins: [components],

  props: {
    position: {
      type: Number,
      required: true
    }
  },

  data: () => ({
    dialogName: 'createGroup',
    formSchema: {},
    formRule: { name: [], key: [], description: [] },
    formData: {},
    formActions: []
  }),

  created() {
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
    ...mapMutations('app', ['CLOSE_DIALOG']),
    ...mapActions('groups', ['create']),

    closeDialog() {
      this.CLOSE_DIALOG(this.dialogName)

      this.$nextTick(() => {
        this.$refs.dialogForm.$refs.form.resetFields()
      })
    },

    async onCreate(emitName) {
      const index = this.formActions.findIndex(
        action => action.emit === emitName
      )

      if (index === -1) {
        return false
      }

      this.formActions[index].loading = true

      try {
        await this.create({
          ...this.formData,
          position: this.position
        })

        this.closeDialog()

        this.$message({
          message: 'Группа успешно добавлена',
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
