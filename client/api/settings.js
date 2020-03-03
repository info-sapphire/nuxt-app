/* eslint-disable space-before-function-paren */
export default $axios => ({
  schema() {
    return $axios.$get('/api/settings/schema')
  },

  update(payload) {
    return $axios.$put('/api/settings/update', payload)
  },

  create(payload) {
    return $axios.$post('/api/settings/create', payload)
  }
})
