const fs = require('fs')
const path = require('path')
const CodedError = require('../libraries/CodedError')
const { dirName, uploadDir } = require('../config')

module.exports = (dirname, toDir = []) => {
  if (toDir.length) {
    toDir.forEach(dir => {
      if (!dirName.test(dir)) {
        throw new CodedError('BAD_REQUEST', {
          message: 'invalid directory name'
        })
      }
    })
  }

  const dir = path.join(dirname, ...uploadDir.concat(toDir))

  if (!fs.existsSync(dir)) {
    throw new CodedError('BAD_REQUEST', {
      message: "dirname doesn't exists"
    })
  }

  return dir
}
