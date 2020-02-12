const express = require('express')
const consola = require('consola')
const bodyParser = require('body-parser')
const nuxt = require('./nuxt')
const { BASE_API_URL } = require('./config')

/**
 * Libraries
 */
const CodedError = require('./libraries/CodedError')

/**
 * Middlewares
 */
const error = require('./middlewares/error')

/**
 * Routes
 */
const mediaRoutes = require('./routes/media.route')

// init app
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/**
 * Init Routes
 */
app.use(BASE_API_URL + 'media', mediaRoutes)
app.use(BASE_API_URL + 'test', (req, res) => {
  console.log(req.body)
  return res.json({ message: 'ok new' })
})

/**
 * Default error for API controllers
 */
app.use(BASE_API_URL, () => {
  throw new CodedError('NOT_FOUND')
})

/**
 * Use error middleware to catch errors
 */
app.use(error)

nuxt().then(nuxt => {
  const { host, port } = nuxt.options.server

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host, () => {
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    })
  })
})
