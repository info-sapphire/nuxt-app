/* eslint-disable space-before-function-paren */
export default $axios => ({
  groupsList() {
    return $axios.$get('/api/users/groups/list')
  },

  createGroup(payload) {
    return $axios.$post('/api/users/groups/create', payload)
  },

  removeGroup(payload) {
    return $axios.$delete(`/api/users/groups/remove/${payload}`)
  }
})
