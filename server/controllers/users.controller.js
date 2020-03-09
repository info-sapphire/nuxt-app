const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { roles } = require('../config')
const CodedError = require('../libraries/CodedError')
const User = require('../models/User')
const Group = require('../models/Group')

/**
 * https://habr.com/ru/post/253395/
 * https://stackoverflow.com/questions/51349764/createindex-in-mongoose
 * https://www.codementor.io/@arpitbhayani/fast-and-efficient-pagination-in-mongodb-9095flbqr
 * https://qna.habr.com/q/238151
 * https://docs.mongodb.com/manual/reference/method/cursor.skip/
 * https://stackoverflow.com/questions/47651502/stop-mongoose-to-create-auto-index
 * http://www.ovaistariq.net/404/mysql-paginated-displays-how-to-kill-performance-vs-how-to-improve-performance/
 * https://github.com/WebDevSimplified/Paginated-API-Express/blob/master/server.js
 * https://habr.com/ru/post/134590/
 * https://stackoverflow.com/questions/5539955/how-to-paginate-with-mongoose-in-node-js
 */

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
      { expiresIn: '10h' }
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

module.exports.groupsList = async (req, res, next) => {
  try {
    const groups = await Group.find().sort({ position: 1 })

    return next(
      new CodedError('SUCCESS', {
        data: {
          groups,
          roles
        }
      })
    )
  } catch (error) {
    return next(new CodedError('CODE_ERROR', { message: error.message }))
  }
}

module.exports.createGroup = async (req, res, next) => {
  const { name, key, description, position } = req.body

  const group = new Group({
    name,
    key,
    description,
    position,
    roles: []
  })

  try {
    await group.save()

    return next(
      new CodedError('CREATED', {
        message: 'Группа создана',
        data: group
      })
    )
  } catch (error) {
    return next(new CodedError('CODE_ERROR', { message: error.message }))
  }
}

module.exports.removeGroup = async (req, res, next) => {
  const { id } = req.params

  try {
    await Group.deleteOne({ _id: id })

    return next(
      new CodedError('SUCCESS', {
        data: id
      })
    )
  } catch (error) {
    return next(new CodedError('CODE_ERROR', { message: error.message }))
  }
}

// module.exports.updateGroup = async (req, res, next) => {
//   const { component, name, label, value, options } = req.body

//   let position = Object.values(settings).reduce((position, value) => {
//     return position <= value.position ? value.position : position
//   }, 0)

//   settings[name] = {
//     ...schema,
//     label,
//     component,
//     value,
//     options,
//     position: ++position
//   }

//   await fs.writeFileSync(dir, JSON.stringify(settings))

//   return next(
//     new CodedError('SUCCESS', {
//       data: settings
//     })
//   )
// }
