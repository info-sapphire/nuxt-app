/* eslint-disable space-before-function-paren */
export const actions = {
  nuxtServerInit({ getters, dispatch }) {
    dispatch('auth/autoLogin')

    if (getters['auth/isAuth']) {
      dispatch('settings/schema')
    }
  }
}
