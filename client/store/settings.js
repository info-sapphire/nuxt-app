/* eslint-disable space-before-function-paren */
export const state = () => ({
  settings: null
})

export const mutations = {
  SET_SETTINGS: (state, payload) => (state.settings = payload)
}

export const actions = {
  async list({ state, commit }) {
    if (state.settings !== null) {
      return state.settings
    }

    try {
      const { list } = this.$repository.settings
      const { data } = await list()

      commit('SET_SETTINGS', data)

      return data
    } catch (err) {
      console.error(err)
    }
  }
}
