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

  data () {
    return {
      page: {
        name: 'Настройки'
      },

      breadcrumbs: [
        { name: 'Аналитика', link: '/admin' },
        { name: 'Настройки', link: '' }
      ],

      formSchema: {
        input: {
          component: 'FormInput',
          label: 'Название сайта:',
          props: {},
          on: {
            blur: this.blur,

            focus: () => {
              console.log('фокус')
            }
          }
        },
        color: {
          component: 'FormColorPicker',
          label: 'Цвет фона:',
          props: { showAlpha: true },
          on: {}
        }
      },

      formRule: {},

      formData: {
        input: '',
        color: '#000'
      }
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

  methods: {
    blur () {
      console.log(this.breadcrumbs, 'покус')
    },

    onSubmit (formData) {
      console.log(formData.input)
    }
  }
}
</script>

<style lang="scss" module>
.wrapper {
}
</style>
