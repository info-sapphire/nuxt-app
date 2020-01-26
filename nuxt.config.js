require('dotenv').config()

module.exports = {
  mode: 'universal',
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
  loading: { color: '#fff' },
  css: [{ src: '~assets/scss/main.scss', lang: 'scss' }],
  plugins: ['@/plugins/element-ui'],
  buildModules: ['@nuxtjs/eslint-module'],
  modules: ['@nuxtjs/axios', ['@nuxtjs/dotenv', { path: __dirname }]],
  axios: {
    baseURL: process.env.NUXT_ENV_API_URL
  },
  build: {
    transpile: [/^element-ui/],
    extend (config, ctx) {}
  }
}
