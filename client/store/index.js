export const actions = {
  async nuxtClientInit({ dispatch }) {
    await dispatch('auth/autoLogin')
  }
}
