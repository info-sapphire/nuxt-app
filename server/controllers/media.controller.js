const fs = require('fs')
const path = require('path')
const multer = require('multer')
const { storage, fileFilter } = require('../libraries/upload')
const CodedError = require('../libraries/CodedError')
const thumbnail = require('../libraries/thumbnail')
const uploadDir = require('../utils/uploadDir')

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
    const dir = fs
      .readdirSync(dirname)
      .filter(file => file.indexOf('.') !== 0)
      .reduce(
        (uploads, file) => {
          if (path.extname(file).length > 0) {
            uploads.files.push(file)
          } else {
            uploads.directories.push(file)
          }

          return uploads
        },
        { directories: [], files: [] }
      )

    return res.json({
      path: dirname.split('static')[1],
      files: dir
    })
  } catch (e) {
    return next(new CodedError('BAD_REQUEST', { message: e.message }))
  }
}

module.exports.upload = (req, res, next) => {
  upload(req, res, async err => {
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
    try {
      /**
       * Пробуем создать миниатюру
       */
      const fileInfo = await thumbnail(req.file)

      return next(
        new CodedError('SUCCESS', {
          data: {
            image: fileInfo.options.input.file.split('static')[1],
            thumb: fileInfo.options.fileOut.split('static')[1]
          }
        })
      )
    } catch (e) {
      return next(new CodedError('BAD_REQUEST', { message: e.message }))
    }
  })
}
