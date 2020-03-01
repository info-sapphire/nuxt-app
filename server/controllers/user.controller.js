const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
const CodedError = require('../libraries/CodedError')
const User = require('../models/User')

module.exports.create = async (req, res, next) => {
  try {
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
