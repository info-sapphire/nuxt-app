export const state = () => ({
  roles: null,
  groups: null
})

export const getters = {
  roles: state => {
    if (state.roles === null) {
      return []
    }

    const roles = {}

    state.roles.forEach(role => {
      const [group] = role.name.split('_')

      if (group in roles) {
        roles[group].description = ''
        roles[group].children.push({
          id: role.name,
          label: role.name,
          description: role.description
        })
      } else {
        roles[group] = {
          id: group,
          label: group,
          description: role.description,
          children: [
            {
              id: role.name,
              label: role.name,
              description: role.description
            }
          ]
        }
      }
    })

    return Object.values(roles).map(role =>
      role.children.length === 1 ? role.children[0] : role
    )
  },

  groups: state => {
    if (state.groups === null) {
      return []
    }

    return state.groups
  }
}

export const mutations = {
  SET_ROLES: (state, payload) => (state.roles = payload),
  SET_GROUPS: (state, payload) => (state.groups = payload),
  ADD_GROUP: (state, payload) => {
    if (state.groups !== null) {
      state.groups.push(payload)
    } else {
      state.groups = [payload]
    }
  },
  UPDATE_GROUP: (state, payload) => {
    const index = state.groups.findIndex(group => group._id === payload._id)
    state.groups[index] = payload
  },
  REMOVE_GROUP: (state, payload) => {
    const index = state.groups.findIndex(group => group._id === payload)
    if (index !== -1) {
      state.groups.splice(index, 1)
    }
    if (state.groups.length === 0) {
      state.groups = null
    }
  }
}

export const actions = {
  async list({ state, commit }, payload) {
    if (state.groups !== null && state.roles !== null) {
      return { roles: state.roles, groups: state.groups }
    }

    try {
      const { list } = this.$repository.groups
      const {
        data: { groups, roles }
      } = await list(payload)

      commit('SET_ROLES', roles)
      commit('SET_GROUPS', groups)

      return { roles, groups }
    } catch (err) {
      throw err
    }
  },

  async create({ commit }, payload) {
    try {
      const { create } = this.$repository.groups
      const { data } = await create(payload)

      commit('ADD_GROUP', data)
    } catch (err) {
      throw err
    }
  },

  async update({ commit }, payload) {
    try {
      const { update } = this.$repository.groups
      const { data } = await update(payload)

      commit('UPDATE_GROUP', data)
    } catch (err) {
      throw err
    }
  },

  async remove({ commit }, payload) {
    try {
      const { remove } = this.$repository.groups
      await remove(payload)

      commit('REMOVE_GROUP', payload)
    } catch (err) {
      throw err
    }
  }
}
