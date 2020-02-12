const fs = require('fs')
const multer = require('multer')
const { storage, fileFilter } = require('../libraries/upload')
const CodedError = require('../libraries/CodedError')
const uploadDir = require('../utils/uploadDir')
const sharp = require('sharp')

/**
 * Создаем хранилище загрузок
 */
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }
}).single('avatar')

module.exports.list = (req, res, next) => {
  const { toDir } = req.query

  try {
    const dirname = uploadDir(__dirname, toDir)
    const dir = fs.readdirSync(dirname).filter(file => file.indexOf('.') !== 0)

    return res.json({
      path: dirname,
      files: dir
    })
  } catch (e) {
    return next(new CodedError('BAD_REQUEST', { message: e.message }))
  }
}

module.exports.upload = (req, res, next) => {
  upload(req, res, err => {
    if (err instanceof multer.MulterError) {
      /**
       * Случилась ошибка Multer при загрузке.
       */
      return next(
        new CodedError(err.code, {
          message: err.message,
          field: err.field
        })
      )
    }

    if (typeof err !== 'undefined') {
      /**
       * При загрузке произошла неизвестная ошибка.
       */
      return next(new CodedError('BAD_REQUEST', { message: err.message }))
    }

    /**
     * Все прекрасно загрузилось.
     */
    console.log(req.file)
    const { filename, path, destination } = req.file
    sharp(path)
      .resize(300, 300)
      .toFile(destination + '/40x40_' + filename, (err, info) => {
        console.log(err, info)
        return next(new CodedError('SUCCESS'))
      })
  })
}
