/* eslint-disable space-before-function-paren */
export default $axios => ({
  login(body) {
    return $axios.$post('/api/auth/login', body)
  }
})
