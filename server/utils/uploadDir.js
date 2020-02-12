const fs = require('fs')
const path = require('path')
const { dirName, uploadDir } = require('../config')

module.exports = (dirname, toDir = []) => {
  if (toDir.length) {
    toDir.forEach(dir => {
      if (!dirName.test(dir)) {
        throw new Error('invalid directory name')
      }
    })
  }

  const dir = path.join(dirname, ...uploadDir.concat(toDir))

  if (!fs.existsSync(dir)) {
    throw new Error("dirname doesn't exists")
  }

  return dir
}
