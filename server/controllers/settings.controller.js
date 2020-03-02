const fs = require('fs')
const path = require('path')
const CodedError = require('../libraries/CodedError')

module.exports.list = async (req, res, next) => {
  const dir = path.join(__dirname, '..', 'config', 'settings.json')
  let settings = {}

  if (fs.existsSync(dir)) {
    settings = await fs.readFileSync(dir, 'utf8')
  }

  return next(
    new CodedError('SUCCESS', {
      data: JSON.parse(settings)
    })
  )
}
