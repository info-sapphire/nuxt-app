export const state = () => ({
  createGroup: false,
  createSettings: false
})

export const mutations = {
  OPEN_DIALOG: (state, dialogName) => (state[dialogName] = true),
  CLOSE_DIALOG: (state, dialogName) => (state[dialogName] = false)
}
