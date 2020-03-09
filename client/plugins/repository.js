// import createRepository from '~/api/repository.js'
import createAuthRepository from '~/api/auth.js'
import createUsersRepository from '~/api/users.js'
import createSettingsRepository from '~/api/settings.js'

export default (ctx, inject) => {
  const repositoryAuth = createAuthRepository(ctx.$axios)
  const repositoryUsers = createUsersRepository(ctx.$axios)
  const repositorySettings = createSettingsRepository(ctx.$axios)

  const repositories = {
    auth: repositoryAuth,
    users: repositoryUsers,
    settings: repositorySettings
    // settings: repository('settings')
  }

  inject('repository', repositories)
}
