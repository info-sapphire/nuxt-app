/* eslint-disable space-before-function-paren */
export default $axios => ({
  options() {
    return $axios.$get('/api/settings')
  },

  schema() {
    return $axios.$get('/api/settings/schema')
  },

  list() {
    return $axios.$get('/api/settings/list')
  },

  update(payload) {
    return $axios.$put('/api/settings/update', payload)
  },

  create(payload) {
    return $axios.$post('/api/settings/create', payload)
  }
})
