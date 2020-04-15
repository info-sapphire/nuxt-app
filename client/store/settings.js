export const state = () => ({
  settings: null,
  schema: null,
  components: null
})

export const mutations = {
  SET_SETTINGS: (state, payload) => (state.settings = payload),
  SET_SCHEMA: (state, payload) => (state.schema = payload),
  SET_COMPONENTS: (state, payload) => (state.components = payload)
}

export const actions = {
  /**
   * получение списка доступных компонентов config/components
   * получение default схемы компонента config/schema
   */
  async schema({ state, commit }) {
    if (state.schema !== null) {
      return state.schema
    }

    try {
      const { schema } = this.$repository.settings
      const {
        data: { components, schema: component }
      } = await schema()

      commit('SET_SCHEMA', component)
      commit('SET_COMPONENTS', components)
    } catch (err) {
      throw err
    }
  },

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
      throw err
    }
  },

  async update({ commit }, payload) {
    try {
      const { update } = this.$repository.settings
      const { data } = await update(payload)

      commit('SET_SETTINGS', data)
    } catch (err) {
      throw err
    }
  },

  async create({ commit }, payload) {
    try {
      const { create } = this.$repository.settings
      const { data } = await create(payload)

      commit('SET_SETTINGS', data)
    } catch (err) {
      throw err
    }
  }
}
