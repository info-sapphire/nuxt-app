/* eslint-disable space-before-function-paren */
export const state = () => ({
  settings: null
})

export const mutations = {
  SET_SETTINGS: (state, payload) => (state.settings = payload)
}

export const actions = {
  async schema({ state, commit }) {
    if (state.settings !== null) {
      return state.settings
    }

    try {
      const { schema } = this.$repository.settings
      const { data } = await schema()

      commit('SET_SETTINGS', data)

      return data
    } catch (err) {
      console.error(err)
    }
  },

  async update({ commit }, payload) {
    try {
      const { update } = this.$repository.settings
      const { data } = await update(payload)

      commit('SET_SETTINGS', data)
    } catch (err) {
      console.error(err)
    }
  }
}
