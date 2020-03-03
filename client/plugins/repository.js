import createRepository from '~/api/repository.js'
import createAuthRepository from '~/api/auth.js'

export default (ctx, inject) => {
  const repositoryAuth = createAuthRepository(ctx.$axios)
  const repository = createRepository(ctx.$axios)

  const repositories = {
    auth: repositoryAuth,
    settings: repository('settings')
  }

  inject('repository', repositories)
}
