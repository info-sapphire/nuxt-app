export default ({ store, redirect }) => {
  if (store.getters['auth/isAuth']) {
    redirect('/')
  }
}
