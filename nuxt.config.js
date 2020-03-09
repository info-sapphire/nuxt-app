/* eslint-disable space-before-function-paren */
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
  loading: { color: '#ee4070' },
  css: ['normalize.css', { src: '@/assets/scss/main.scss', lang: 'scss' }],
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/awesome-icon',
    '@/plugins/axios',
    '@/plugins/repository',
    '@/plugins/vue-slicksort'
  ],
  buildModules: ['@nuxtjs/eslint-module'],
  modules: [
    '@nuxtjs/axios',
    'nuxt-svg-loader',
    'nuxt-i18n',
    ['@nuxtjs/dotenv', { path: __dirname }]
  ],
  axios: {
    baseURL: process.env.NUXT_ENV_API_URL
  },
  i18n: {
    // locales: ['en', 'fr', 'es'],
    // lazy: true,
    // langDir: 'lang/',
    // defaultLocale: 'en',
    // vueI18n: {
    //   fallbackLocale: 'en'
    // }
  },
  build: {
    transpile: [/^element-ui/],
    extend(config, ctx) {}
  }
}
