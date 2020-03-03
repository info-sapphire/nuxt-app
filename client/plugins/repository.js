// import createRepository from '~/api/repository.js'
import createAuthRepository from '~/api/auth.js'
import createSettingsRepository from '~/api/settings.js'

export default (ctx, inject) => {
  const repositoryAuth = createAuthRepository(ctx.$axios)
  const repositorySettings = createSettingsRepository(ctx.$axios)

  const repositories = {
    auth: repositoryAuth,
    settings: repositorySettings
    // settings: repository('settings')
  }

  inject('repository', repositories)
}
