export default async ({ store: { dispatch } }) => {
  await dispatch('settings/schema')
}
