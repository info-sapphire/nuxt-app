const fs = require('fs')
const path = require('path')
const { dirName, uploadDir } = require('../config')

module.exports = (dirname, toDir = []) => {
  if (toDir.length) {
    toDir.forEach(dir => {
      if (!dirName.test(dir)) {
        throw new Error('invalid dirname')
      }
    })
  }

  uploadDir = path.join(__dirname, ...uploadDir)

  return uploadDir.concat(toDir)
}
