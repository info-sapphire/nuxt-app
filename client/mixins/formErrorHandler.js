export default {
  methods: {
    errorField(form, prop, message) {
      const field = form.fields.find(field => field.prop === prop)
      if (field) {
        field.validateMessage = message
        field.validateState = 'error'
      }
    },

    showError(form, data) {
      data.forEach(item => {
        const field = Object.keys(item)[0]
        this.errorField(form, field, item[field])
      })
    },

    formatError(error) {
      const data = { message: 'Internal Server Error', status: 500 }

      if (error.response === undefined) {
        error.response = { data }

        if (error.message !== undefined) {
          error.response.data.message = error.message
        }
      }

      return error
    }
  }
}
