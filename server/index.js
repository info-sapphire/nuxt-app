const express = require('express')
const consola = require('consola')
const bodyParser = require('body-parser')
const nuxt = require('./nuxt')

nuxt().then(nuxt => {
  const { host, port } = nuxt.options.server

  // init app
  const app = express()

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // routes
  const mediaRoutes = require('./routes/media.route')

  // routes init
  app.use('/api/media', mediaRoutes)

  // Listen the server
  app.listen(port, host, () => {
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    })
  })
})
