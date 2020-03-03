/* eslint-disable space-before-function-paren */
export default $axios => resource => ({
  list() {
    return $axios.$get(`/api/${resource}/list`)
  },

  create(payload) {
    return $axios.$post(`/api/${resource}/create`, payload)
  }

  //   show(id) {
  //     return $axios.$get(`/posts/${id}`)
  //   },

  //   update(payload, id) {
  //     return $axios.$put(`/posts/${id}`, payload)
  //   },

  //   delete(id) {
  //     return $axios.$delete(`/posts/${id}`)
  //   }
})
