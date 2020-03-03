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
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import AppPageHeadline from '~/components/admin/page/AppPageHeadline'
import AppForm from '~/components/admin/form/AppForm'

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

  data () {
    return {
      page: {
        name: 'Настройки'
      },

      breadcrumbs: [
        { name: 'Аналитика', link: '/admin' },
        { name: 'Настройки', link: '' }
      ]
    }
  },

  watch: {
    formData: {
      deep: true,
      // immediate: true,
      handler (value) {
        console.log(value)
      }
    }
  },

  mounted () {
    // console.log(this.settings)
  },

  methods: {
    onSubmit () {}
  }
}
</script>

<style lang="scss" module>
.wrapper {
}
</style>
