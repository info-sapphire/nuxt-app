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
      :actions="formActions"
      @submit="onSubmit"
      @popup="onPopup"
    />
    <AppCreateOptionDialog
      v-if="dialogDataLoaded"
      ref="createOptionDialog"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import AppPageHeadline from '~/components/admin/page/AppPageHeadline'
import AppForm from '~/components/admin/form/AppForm'
import AppCreateOptionDialog from '~/components/admin/settings/AppCreateOptionDialog'

export default {
  layout: 'admin',

  components: {
    AppPageHeadline,
    AppForm,
    AppCreateOptionDialog
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

    formActions: [],

    showDialog: false,
    dialogDataLoaded: false
  }),

  computed: {
    ...mapState('settings', ['settings'])
  },

  watch: {
    settings: {
      deep: true,
      handler (value) {
        const newProps = Object.entries(value).reduce((props, prop) => {
          const [name] = prop
          console.log(prop, name, props)
          if (this.formSchema[name] === undefined) {
            props.push(name)
          }
          return props
        }, [])

        if (newProps.length > 0) {
          newProps.forEach(prop => {
            this.$set(this.formData, prop, value[prop].value)
            this.$set(this.formSchema, prop, value[prop])
          })
        }
      }
    }
  },

  created () {
    this.formActions.push({
      emit: 'submit',
      type: 'primary',
      loading: false,
      validate: true,
      name: 'Обновить'
    })

    this.formActions.push({
      emit: 'popup',
      type: 'warning',
      loading: false,
      validate: false,
      name: 'Добавить настройку'
    })
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
      const index = this.formActions.findIndex(
        action => action.emit === emitName
      )

      if (index !== -1) {
        this.formActions[index].loading = true
        this.schema().then(() => {
          setTimeout(() => {
            if (!this.dialogDataLoaded) {
              this.dialogDataLoaded = true
            }

            this.$nextTick(() => {
              this.$refs.createOptionDialog.showDialog = true
              this.formActions[index].loading = false
            })
          }, 100)
        })
      }
    }
  }
}
</script>

<style lang="scss" module>
.wrapper {
}
</style>
