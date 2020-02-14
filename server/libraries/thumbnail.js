const fs = require('fs')
const dir = require('path')
const sharp = require('sharp')
const {
  thumbnail: { width, height },
  mimetype: { images }
} = require('../config')

module.exports = async file => {
  const { filename, path, destination } = file
  const mimetype = [...images]

  if (!mimetype.includes(file.mimetype)) {
    return new Promise(resolve => resolve())
  }

  const thumbDir = dir.join(destination, '.thumb')

  try {
    if (!fs.existsSync(thumbDir)) {
      await fs.mkdirSync(thumbDir)
    }
  } catch (err) {
    throw new Error(err)
  }

  const thumbnail = dir.join(thumbDir, `${width}x${height}_${filename}`)

  try {
    return await sharp(path)
      .resize(width, height)
      .toFile(thumbnail, (_, info) => {
        return info
      })
  } catch (err) {
    throw new Error(err)
  }
}
