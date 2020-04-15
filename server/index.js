const express = require('express')
const mongoose = require('mongoose')
const consola = require('consola')
const bodyParser = require('body-parser')
const connectTimeout = require('connect-timeout')
const helmet = require('helmet')

const isNuxt = process.env.NUXT_MODE !== 'off'
const nuxt = require('./nuxt')
const { BASE_API_URL } = require('./config')

const {
  /* MONGO_URI */
  NUXT_ENV_MONGO_URI: MONGO_URI,
  /* TIMEOUT */
  NUXT_ENV_TIMEOUT: TIMEOUT
} = process.env

/**
 * Libraries
 */
const CodedError = require('./libraries/CodedError')

/**
 * Middlewares
 */
const errorHandler = require('./middlewares/errorHandler')

/**
 * Routes
 */
const installRoute = require('./routes/install.route')
const authRoute = require('./routes/auth.route')
const mediaRoutes = require('./routes/media.route')
const groupRoute = require('./routes/group.route')
const userRoute = require('./routes/user.route')
const settingsRoutes = require('./routes/settings.route')

// init app
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(connectTimeout(TIMEOUT))
app.use(
  helmet({
    hidePoweredBy: { setTo: 'ASP.NET, ColdFusion Server' },
    hsts: false,
    ieNoOpen: false,
    xssFilter: false
  })
)

/**
 * Init Install Route
 */
app.use(BASE_API_URL + 'install', installRoute)

/**
 * Init Auth Routes
 */
app.use(BASE_API_URL + 'auth', authRoute)

/**
 * Init Base Routes
 */
app.use(BASE_API_URL + 'media', mediaRoutes)
app.use(BASE_API_URL + 'groups', groupRoute)
app.use(BASE_API_URL + 'users', userRoute)
app.use(BASE_API_URL + 'settings', settingsRoutes)

/**
 * Default error for API controllers
 */
app.use(BASE_API_URL, () => {
  throw new CodedError('NOT_FOUND')
})

/**
 * Use error middleware to catch errors
 */
app.use(errorHandler)

/**
 * Special route for Nuxt stub
 * NUXT_MODE = off
 */
if (!isNuxt) {
  app.use((req, res, next) => {
    return res.send("<h1>it's work!</h1>")
  })
}

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
