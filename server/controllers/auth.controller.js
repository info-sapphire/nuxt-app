const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const CodedError = require('../libraries/CodedError')
const User = require('../models/User')

module.exports.login = async (req, res, next) => {
  try {
    const { email, passwd } = req.body
    const {
      NUXT_ENV_JWT_SECRET: JWT_SECRET,
      NUXT_ENV_JWT_EXPIRES: JWT_EXPIRES
    } = process.env

    const candidate = await User.findOne({ email })

    if (!candidate) {
      /** несуществующий email  */
      return next(
        new CodedError('INVALID_USER', {
          message: 'Неверные email или пароль'
        })
      )
    }

    const isMatch = await bcrypt.compare(passwd, candidate.passwd)

    if (!isMatch) {
      /** неверный пароль  */
      return next(
        new CodedError('INVALID_USER', {
          message: 'Неверные email или пароль'
        })
      )
    }

    const token = jwt.sign(
      {
        userId: candidate.id
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    )

    return next(
      new CodedError('SUCCESS', {
        data: {
          guid: candidate.id,
          token
        }
      })
    )
  } catch (error) {
    return next(new CodedError('CODE_ERROR', { message: error.message }))
  }
}
