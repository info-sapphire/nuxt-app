/* eslint-disable space-before-function-paren */
export const state = () => ({
  settings: null,
  schema: null
})

export const mutations = {
  SET_SETTINGS: (state, payload) => (state.settings = payload),
  SET_SCHEMA: (state, payload) => (state.settings = payload)
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
  },

  async schema({ state, commit }) {
    if (state.schema !== null) {
      return state.schema
    }

    try {
      const { schema } = this.$repository.settings
      const { data } = await schema()

      commit('SET_SCHEMA', data)
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