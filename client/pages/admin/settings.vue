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

    dialog: null
  }),

  computed: {
    ...mapState({
      component: state => state.settings.schema
    })
  },

  // watch: {
  //   formData: {
  //     deep: true,
  //     immediate: true,
  //     handler (value) {
  //       console.log(value)
  //     }
  //   }
  // },

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
          this.dialog.schema = {
            name: {
              ...this.component,
              component: 'FormInput',
              label: 'Ключ свойства'
            },
            label: {
              ...this.component,
              component: 'FormInput',
              label: 'Название свойства'
            }
          }
          this.dialog.data = { name: '', label: '' }
          this.dialog.rule = {
            name: [{ required: true, trigger: 'blur' }],
            label: [{ required: true, trigger: 'blur' }]
          }
          this.dialog.actions = [
            {
              emit: 'create',
              type: 'success',
              loading: false,
              validate: true,
              name: 'Добавить'
            }
          ]

          this.actions[index].loading = false
          this.dialog.state = true
        })
      }
    },

    onCreate () {
      console.log('okk')
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
    }
  }
}
</style>
