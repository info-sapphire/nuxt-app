const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs')
const CodedError = require('../libraries/CodedError')
const Group = require('../models/Group')
const User = require('../models/User')

module.exports.install = async (req, res, next) => {
  let { email, passwd } = req.query

  if (email === undefined) {
    email = 'ex3xeng@yandex.ru'
  }

  if (passwd === undefined) {
    passwd = 'qwerty123'
  }

  try {
    const cache = path.join(__dirname, '..', '..', '.cache')

    if (fs.existsSync(cache)) {
      return next(new CodedError('ACCESS_DENIED'))
    }

    await fs.mkdirSync(cache)
    await fs.writeFileSync(
      path.join(cache, 'settings.json'),
      JSON.stringify({})
    )

    const group = new Group({
      name: 'Разработчики',
      key: 'developers',
      description: 'Группа супер пользователей без ограничений',
      position: 1,
      roles: ['DEVELOPER']
    })

    await group.collection.drop()
    await group.save()

    const hash = await bcrypt.hash(passwd, 12)
    const user = new User({
      email,
      passwd: hash,
      group: group._id
    })

    await user.collection.drop()
    await user.save()

    const {
      _id,
      group: { name, roles }
    } = await User.findById(user._id).populate('group', ['name', 'roles'])

    return next(
      new CodedError('CREATED', {
        message: 'Сайт успешно установлен',
        data: {
          _id,
          email,
          passwd,
          group: name,
          roles
        }
      })
    )
  } catch (error) {
    return next(new CodedError('CODE_ERROR', { message: error.message }))
  }
}
