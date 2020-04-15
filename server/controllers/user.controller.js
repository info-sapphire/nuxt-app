const bcrypt = require('bcryptjs')
const CodedError = require('../libraries/CodedError')
const User = require('../models/User')

module.exports.list = async (req, res, next) => {
  try {
    /**
     * @TODO: филтровать req.query
     * написать обертку фильтрующую запрос в БД
     */
    /** временно для режима разработки */
    const users = await User.find(req.query)
      .sort({ _id: -1 })
      .limit(11)
      .populate('group', 'name')

    const isData = users.length > 10

    return next(
      new CodedError('SUCCESS', {
        data: {
          results: isData ? users.slice(0, users.length - 1) : users,
          next: isData
        }
      })
    )
  } catch (error) {
    return next(new CodedError('CODE_ERROR', { message: error.message }))
  }
}

module.exports.create = async (req, res, next) => {
  try {
    const { email, passwd, group } = req.body

    const candidate = await User.findOne({ email })

    if (candidate) {
      return next(
        new CodedError('CONFLICT', {
          message: 'Такой пользователь уже существует'
        })
      )
    }

    const hash = await bcrypt.hash(passwd, 12)
    const user = new User({ email, passwd: hash, group })

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

module.exports.update = async (req, res, next) => {
  try {
    const { email, passwd, group } = req.body
    const { id: userId } = req.params

    const currentUser = await User.findOne({ _id: userId })

    if (!currentUser) {
      return next(
        new CodedError('NOT_FOUND', {
          message: 'Пользователя не существует'
        })
      )
    }

    const userWithEmail = await User.findOne({ email })

    if (userWithEmail && String(userWithEmail._id) !== userId) {
      return next(
        new CodedError('CONFLICT', {
          message: 'Пользователь с таким email уже существует'
        })
      )
    }

    const hash = await bcrypt.hash(passwd, 12)

    const $set = {}

    if (currentUser.email !== email) {
      $set.email = email
    }

    if (currentUser.passwd !== passwd) {
      $set.passwd = hash
    }

    if (String(currentUser.group) !== group) {
      $set.group = group
    }

    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set },
      { new: true, useFindAndModify: false }
    )
    return next(
      new CodedError('SUCCESS', {
        message: 'Пользователь изменен',
        data: user
      })
    )
  } catch (error) {
    return next(new CodedError('CODE_ERROR', { message: error.message }))
  }
}

module.exports.remove = async (req, res, next) => {
  const { id } = req.params

  try {
    await User.deleteOne({ _id: id })

    return next(
      new CodedError('SUCCESS', {
        data: id
      })
    )
  } catch (error) {
    return next(new CodedError('CODE_ERROR', { message: error.message }))
  }
}
