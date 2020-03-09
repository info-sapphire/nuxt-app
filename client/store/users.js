/* eslint-disable space-before-function-paren */
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

    // return state.groups.map(group => {
    //   return { ...group, remove: false, loading: false }
    // })
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
  async groupsList({ state, commit }, payload) {
    if (state.groups !== null && state.roles !== null) {
      return { roles: state.roles, groups: state.groups }
    }

    try {
      const { groupsList } = this.$repository.users
      const {
        data: { groups, roles }
      } = await groupsList(payload)

      const groupsDummy = groups.map(group => {
        return { ...group, remove: false, loading: false }
      })

      commit('SET_ROLES', roles)
      commit('SET_GROUPS', groupsDummy)

      return { roles, groups }
    } catch (err) {
      console.error(err)
    }
  },

  async createGroup({ commit }, payload) {
    try {
      const { createGroup } = this.$repository.users
      const { data } = await createGroup(payload)

      commit('ADD_GROUP', data)
    } catch (err) {
      console.error(err)
    }
  },

  async removeGroup({ commit }, payload) {
    try {
      const { removeGroup } = this.$repository.users
      await removeGroup(payload)

      commit('REMOVE_GROUP', payload)
    } catch (err) {
      console.error(err)
    }
  }
}
