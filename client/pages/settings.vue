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
      @popup="OPEN_DIALOG('createSettings')"
    />
    <AppCreateSettings />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

import AppPageHeadline from '~/components/elements/page-headline/AppPageHeadline'
import AppForm from '~/components/form/AppForm'
import AppCreateSettings from '~/components/settings/AppCreateSettings'

export default {
  components: {
    AppPageHeadline,
    AppForm,
    AppCreateSettings
  },

  async asyncData({ store, params, error }) {
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

    formActions: []
  }),

  computed: {
    ...mapState('settings', ['settings'])
  },

  watch: {
    settings: {
      deep: true,
      handler(value) {
        const newProps = Object.entries(value).reduce((props, prop) => {
          const [name] = prop
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

        if (
          Object.keys(this.formSchema).length > 0 &&
          this.formActions.length < 2
        ) {
          this.addCreateButton()
        } else if (
          Object.keys(this.formSchema).length === 0 &&
          this.formActions.length > 1
        ) {
          this.formActions.shift()
        }
      }
    }
  },

  created() {
    if (Object.keys(this.formSchema).length > 0) {
      this.addCreateButton()
    }

    this.formActions.push({
      emit: 'popup',
      type: 'warning',
      loading: false,
      validate: false,
      name: 'Добавить настройку'
    })
  },

  methods: {
    ...mapMutations('app', ['OPEN_DIALOG']),
    ...mapActions('settings', ['schema', 'update']),

    addCreateButton() {
      this.formActions.unshift({
        emit: 'submit',
        type: 'primary',
        loading: false,
        validate: true,
        name: 'Обновить'
      })
    },

    onSubmit(emitName) {
      const index = this.formActions.findIndex(
        action => action.emit === emitName
      )

      if (index === -1) {
        return false
      }

      this.formActions[index].loading = true

      this.update(this.formData).finally(() => {
        this.formActions[index].loading = false
      })
    }
  }
}
</script>

<style lang="scss" module>
.wrapper {
}
</style>
