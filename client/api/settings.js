export default $axios => ({
  schema() {
    return $axios.$get('/api/settings/schema')
  },

  options() {
    return $axios.$get('/api/settings')
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
