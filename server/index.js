const { Nuxt, Builder } = require('nuxt')
const consola = require('consola')
const app = require('./app')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
const isDev = process.env.NODE_ENV !== 'production'

// Init Nuxt.js
const nuxt = new Nuxt({ ...config, dev: isDev })

const { host, port } = nuxt.options.server

/* eslint no-unreachable: 0 */
;(async () => {
  if (isDev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host, () => {
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    })
  })
})()
