<template>
  <div class="container">
    <h1>Access section</h1>
    <AppForm
      :schema="formSchema"
      :rules="formRule"
      :value="formData"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import AppForm from '~/components/form/AppForm'

export default {
  components: {
    AppForm
  },

  data: () => ({
    formSchema: {},

    formRule: {},

    formData: {
      image: ''
    }
  }),

  computed: {
    ...mapState('settings', ['schema', 'components'])
  },

  mounted() {
    const component = this.schema

    this.$set(this.formSchema, 'image', {
      ...component,
      component: 'FormMediaInput',
      position: 1,
      props: { placeholder: 'укажите путь до файла' }
    })
  }
}
</script>
