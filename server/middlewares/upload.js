const path = require('path')
const multer = require('multer')
// const sharp = require('sharp')
const uuidv4 = require('../../common/uuidv4')
const dirname = require('../utils/dirname')

const storage = multer.diskStorage({
  destination (req, _, callback) {
    const { toDir } = req.query
    let uploadDir

    try {
      uploadDir = dirname(toDir)
    } catch (e) {
      // invalid dirname
      callback(null, false)
    }

    callback(null, path.join(__dirname, ...uploadDir))
  },
  filename (_, file, callback) {
    const timestamp = Math.floor(new Date().getTime() / 1000)
    const prefix = uuidv4()
      .split('-')
      .pop()

    callback(null, `${timestamp}.${prefix}${path.extname(file.originalname)}`)
  }
})
const fileFilter = (req, file, callback) => {
  console.log('fileFilter: ', file)
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    callback(null, true)
  } else {
    callback(null, false)
  }
}

module.exports = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
})
