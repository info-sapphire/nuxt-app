/* eslint-disable space-before-function-paren */
export default $axios => ({
  groupsList() {
    return $axios.$get('/api/users/groups/list')
  },

  createGroup(payload) {
    return $axios.$post('/api/users/groups/create', payload)
  },

  updateGroup({ id, payload }) {
    return $axios.$put(`/api/users/groups/update/${id}`, payload)
  },

  removeGroup(payload) {
    return $axios.$delete(`/api/users/groups/remove/${payload}`)
  },

  createUser(payload) {
    return $axios.$post('/api/users/create', payload)
  },

  updateUser({ id, payload }) {
    return $axios.$put(`/api/users/update/${id}`, payload)
  },

  removeUser(payload) {
    return $axios.$delete(`/api/users/remove/${payload}`)
  }
})
