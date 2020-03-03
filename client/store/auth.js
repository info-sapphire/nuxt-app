/* eslint-disable no-useless-catch */
/* eslint-disable space-before-function-paren */
import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const state = () => ({
  token: null
})

export const getters = {
  isAuth: state => Boolean(state.token),
  token: state => state.token
}

export const mutations = {
  setToken: (state, token) => (state.token = token),
  clearToken: state => (state.token = null)
}

export const actions = {
  async login({ dispatch }, formData) {
    try {
      const { login } = this.$repository.auth
      const {
        data: { token }
      } = await login(formData)

      dispatch('setToken', token)
    } catch (err) {
      throw err
    }
  },

  logout({ commit }) {
    commit('clearToken')
    this.$axios.setHeader('Access-Token', false)
    Cookies.remove('access-token')
  },

  setToken({ commit }, token) {
    this.$axios.setHeader('Access-Token', token)
    commit('setToken', token)
    Cookies.set('access-token', token)
  },

  autoLogin({ dispatch }) {
    const cookieStr = process.browser
      ? document.cookie
      : this.app.context.req.headers.cookie

    const cookies = Cookie.parse(cookieStr || '') || {}
    const token = cookies['access-token']

    if (isJWTValid(token)) {
      dispatch('setToken', token)
    } else {
      dispatch('logout')
    }
  }
}

function isJWTValid(token) {
  if (!token) {
    return false
  }

  const jwtData = jwtDecode(token) || {}
  const expires = jwtData.exp || 0

  return new Date().getTime() / 1000 < expires
}
