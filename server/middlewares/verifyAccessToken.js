const jwt = require('jsonwebtoken')
const CodedError = require('../libraries/CodedError')

module.exports = (req, res, next) => {
  const token = req.header('Access-Token')

  if (!token) {
    return next(new CodedError('UNAUTHORIZED'))
  }

  try {
    req.user = jwt.verify(token, process.env.NUXT_ENV_JWT_SECRET)
    next()
  } catch (err) {
    return next(new CodedError('UNAUTHORIZED'))
  }
}
