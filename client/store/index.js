/* eslint-disable space-before-function-paren */
export const actions = {
  nuxtServerInit({ dispatch }) {
    dispatch('auth/autoLogin')
  }
}
