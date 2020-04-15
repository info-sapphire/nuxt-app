export const state = () => ({
  lastIndex: null
})

export const mutations = {
  SET_INDEX: (state, payload) => (state.lastIndex = payload)
}

export const actions = {
  async list({ state, commit }, tryLoad = false) {
    try {
      const { list } = this.$repository.users
      let payload = {}

      /** Из полученных данных в store сохраняется/обновляется только ObjectId
       * при переходе на другую страницу listData будет утерян,
       * но ObjectId последнего полученного элемента будет хранится
       * следовательно если вернуться назад то запрос выполнится учитывая уже имеющийся ObjectId
       * его надо как-то сбросить, в данный момент (DEVELOP) считаю нижеописанную конструкцию
       * с входящей переменной tryLoad для игнорирования уже имеющегося ObjectId выгодной
       */
      if (tryLoad) {
        const { lastIndex } = state
        payload = { _id: { $lt: lastIndex } }
      }

      const {
        data: { results, next }
      } = await list(payload)

      if (results.length > 0) {
        commit('SET_INDEX', results[results.length - 1]._id)
      }

      return { results, next }
    } catch (err) {
      throw err
    }
  },

  async create(_, payload) {
    try {
      const { create } = this.$repository.users
      return await create(payload)
    } catch (err) {
      console.error(err)
    }
  },

  async update(_, payload) {
    try {
      const { update } = this.$repository.users
      return await update(payload)
    } catch (err) {
      console.error(err)
    }
  },

  async remove(_, userId) {
    try {
      const { remove } = this.$repository.users
      await remove(userId)
    } catch (err) {
      throw err
    }
  },

  async byId(_, userId) {
    try {
      const { byId } = this.$repository.users
      const {
        data: { results }
      } = await byId(userId)
      return results.length > 0 ? results[0] : null
    } catch (err) {
      throw err
    }
  }
}
