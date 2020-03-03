// import createRepository from '~/api/repository.js'
import createAuthRepository from '~/api/auth.js'

export default (ctx, inject) => {
  const repositoryAuth = createAuthRepository(ctx.$axios)

  const repositories = {
    auth: repositoryAuth
  }

  inject('repository', repositories)
}
