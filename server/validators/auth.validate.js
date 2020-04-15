const CodedError = require('../libraries/CodedError')
const validator = require('../libraries/validator')

module.exports.login = (req, res, next) => {
  const errors = validator(
    {
      email: { required: true, max: 40 },
      passwd: { required: true, max: 40 }
    },
    req.body
  )

  if (errors.length > 0) {
    return next(
      new CodedError('BAD_REQUEST', {
        message: 'Некорректные данные при авторизации',
        data: errors
      })
    )
  }

  next()
}
