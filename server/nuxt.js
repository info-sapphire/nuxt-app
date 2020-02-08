const { Nuxt, Builder } = require('nuxt')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
const isDev = process.env.NODE_ENV !== 'production'

// Init Nuxt.js
const nuxt = new Nuxt({ ...config, dev: isDev })

module.exports = async () => {
  if (isDev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  return nuxt
}
