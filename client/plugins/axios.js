export default ({ $axios, redirect, store }) => {
  $axios.interceptors.request.use(request => {
    const condition =
      store.getters['auth/isAuth'] && !request.headers.common['Access-Token']

    if (condition) {
      const token = store.getters['auth/token']
      request.headers.common['Access-Token'] = token
    }

    return request
  })

  $axios.onError(error => {
    if (error.response) {
      if (error.response.status === 401) {
        // redirect('/login')
        // store.dispatch('auth/logout')
        console.error('401')
      }

      if (error.response.status === 500) {
        console.error('Server 500 error')
      }
    }
  })
}
