const fs = require('fs')
const path = require('path')
const CodedError = require('../libraries/CodedError')
const { components, schema } = require('../config')
/** settings.json */
const dir = path.join(__dirname, '..', 'config', 'settings.json')
const settings = fs.existsSync(dir)
  ? JSON.parse(fs.readFileSync(dir, 'utf8'))
  : {}

module.exports.options = (req, res, next) => {
  const options = {}

  if (Object.keys(req.body).length > 0) {
    for (const prop in settings) {
      options[prop] = settings[prop].value
    }
  }

  return next(
    new CodedError('SUCCESS', {
      data: options
    })
  )
}

module.exports.schema = (req, res, next) => {
  return next(
    new CodedError('SUCCESS', {
      data: { components, schema }
    })
  )
}

module.exports.list = (req, res, next) => {
  return next(
    new CodedError('SUCCESS', {
      data: settings
    })
  )
}

module.exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length > 0) {
    for (const prop in settings) {
      if (req.body[prop]) {
        settings[prop].value = req.body[prop]
      }
    }
    await fs.writeFileSync(dir, JSON.stringify(settings))
  }

  return next(
    new CodedError('SUCCESS', {
      data: settings
    })
  )
}

module.exports.create = async (req, res, next) => {
  const { component, name, label, value, options } = req.body

  let position = Object.values(settings).reduce((position, value) => {
    return position <= value.position ? value.position : position
  }, 0)

  settings[name] = {
    ...schema,
    label,
    component,
    value,
    options,
    position: ++position
  }

  await fs.writeFileSync(dir, JSON.stringify(settings))

  return next(
    new CodedError('SUCCESS', {
      data: settings
    })
  )
}
