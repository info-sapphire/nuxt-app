/* eslint-disable space-before-function-paren */
export const actions = {
  nuxtServerInit({ dispatch }) {
    return Promise.all([
      dispatch('auth/autoLogin'),
      dispatch('settings/schema')
    ])
  }
}
