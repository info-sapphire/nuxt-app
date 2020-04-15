import { flatten } from 'q-flat'

const list = ($axios, resource, payload = {}) => {
  const _q = new URLSearchParams(flatten(payload)).toString()
  const query = _q.length > 0 ? `?${_q}` : ''

  return $axios.$get(`/api/${resource}/list${query}`)
}

export default $axios => resource => ({
  list(payload = {}) {
    return list($axios, resource, payload)
  },

  byId(id) {
    return list($axios, resource, { _id: { $eq: id } })
  },

  create(payload) {
    return $axios.$post(`/api/${resource}/create`, payload)
  },

  update({ id, payload }) {
    return $axios.$put(`/api/${resource}/update/${id}`, payload)
  },

  remove(id) {
    return $axios.$delete(`/api/${resource}/remove/${id}`)
  }
})
