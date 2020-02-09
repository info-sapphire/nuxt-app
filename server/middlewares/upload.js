const path = require('path')
const multer = require('multer')
const uuidv4 = require('../../utils/uuidv4')

const storage = multer.diskStorage({
  destination (req, _, callback) {
    const { dir } = req.query
    let _dir = ['..', '..', 'client', 'static', 'uploads']

    if (typeof dir !== 'undefined') {
      _dir = _dir.concat(dir)
    }

    const dirs = path.join(__dirname, ..._dir)

    callback(null, dirs)
  },
  filename (req, file, callback) {
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
