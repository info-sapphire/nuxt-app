const path = require('path')
const multer = require('multer')
const uuidv4 = require('../../common/uuidv4')
const uploadDir = require('../utils/uploadDir')

let dirname

const storage = multer.diskStorage({
  destination (req, _, callback) {
    const { toDir } = req.query

    try {
      dirname = uploadDir(__dirname, toDir)
      callback(null, dirname)
    } catch (e) {
      callback(new Error(e.message))
    }
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

module.exports = { storage, fileFilter }
