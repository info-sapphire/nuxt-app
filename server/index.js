const express = require('express')
const mongoose = require('mongoose')
const consola = require('consola')
const bodyParser = require('body-parser')
const nuxt = require('./nuxt')
const { BASE_API_URL } = require('./config')

const { NUXT_ENV_MONGO_URI: MONGO_URI } = process.env

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
const authRoute = require('./routes/auth.route')
const mediaRoutes = require('./routes/media.route')
const usersRoutes = require('./routes/users.route')
const settingsRoutes = require('./routes/settings.route')
const dynamicRoutes = require('./routes/dynamic.route')

// init app
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/**
 * Init Auth Routes
 */
app.use(BASE_API_URL + 'auth', authRoute)

/**
 * Init Base Routes
 */
app.use(BASE_API_URL + 'media', mediaRoutes)
app.use(BASE_API_URL + 'users', usersRoutes)
app.use(BASE_API_URL + 'settings', settingsRoutes)

/**
 * Init Dynamic Routes
 */
app.use(BASE_API_URL + ':controller', dynamicRoutes)

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

  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => {
      consola.ready({ message: 'Database connected.', badge: true })
      // Listen the server
      app.listen(port, host, () => {
        consola.ready({
          message: `Server listening on http://${host}:${port}`,
          badge: true
        })
      })
    })
    .catch(error => {
      console.error(error.message)
      process.exit(1)
    })
})
