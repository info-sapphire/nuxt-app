export default $axios => ({
  login(body) {
    return $axios.$post('/api/auth/login', body)
  }
})
