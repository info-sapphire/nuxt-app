const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const CodedError = require('../libraries/CodedError')
const User = require('../models/User')

module.exports.create = async (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return next(
        new CodedError('BAD_REQUEST', {
          message: 'Некорректные данные при регистрации',
          data: errors.array()
        })
      )
    }

    const { email, passwd } = req.body

    const candidate = await User.findOne({ email })

    if (candidate) {
      return next(
        new CodedError('CONFLICT', {
          message: 'Такой пользователь уже существует'
        })
      )
    }

    const hash = await bcrypt.hash(passwd, 12)
    const user = new User({ email, passwd: hash })

    await user.save()

    return next(
      new CodedError('CREATED', {
        message: 'Пользователь создан'
      })
    )
  } catch (error) {
    return next(new CodedError('CODE_ERROR', { message: error.message }))
  }
}

module.exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return next(
        new CodedError('BAD_REQUEST', {
          message: 'Некорректные данные при входе в систему',
          data: errors.array()
        })
      )
    }

    const { email, passwd } = req.body

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
      process.env.NUXT_ENV_JWT_SECRET,
      { expiresIn: '1h' }
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
