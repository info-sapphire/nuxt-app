require('dotenv').config()

module.exports = {
  mode: 'spa',
  srcDir: 'client/',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#ee4070' },
  css: ['normalize.css', { src: '@/assets/scss/main.scss', lang: 'scss' }],
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios',
    '@/plugins/repository',
    '@/plugins/vue-slicksort',
    '@/plugins/awesome-icon',
    '@/plugins/nuxt-client'
  ],
  buildModules: ['@nuxtjs/eslint-module'],
  modules: [
    '@nuxtjs/axios',
    'nuxt-svg-loader',
    ['@nuxtjs/dotenv', { path: __dirname }]
  ],
  axios: {
    baseURL: process.env.NUXT_ENV_API_URL
  },
  build: {
    transpile: [/^element-ui/],
    extend(config, ctx) {
      config.resolve.alias['~src'] = __dirname
    }
  }
}
