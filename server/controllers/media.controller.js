const fs = require('fs')
const multer = require('multer')
const upload = require('../middlewares/upload').single('avatar')
const CodedError = require('../libraries/CodedError')
const uploadDir = require('../utils/uploadDir')

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
    return next(new CodedError('SUCCESS'))
  })
}
