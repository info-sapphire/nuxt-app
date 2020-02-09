const fs = require('fs')
const path = require('path')
const multer = require('multer')
const upload = require('../middlewares/upload').single('avatar')
const { dirName, uploadDir } = require('../config')

module.exports.list = (req, res) => {
  const { toDir } = req.query
  let dirname = uploadDir

  if (typeof toDir !== 'undefined') {
    toDir.forEach(dir => {
      if (!dirName.test(dir)) {
        // error
        return res.json({ error: 'invalid dirname' })
      }
    })
    dirname = dirname.concat(toDir)
  }

  // Путь до директории загрузок
  dirname = path.join(__dirname, ...dirname)
  if (!fs.existsSync(dirname)) {
    // error
    return res.json({ error: "dirname doesn't exists" })
  }
  // Директория загрузок
  const dir = fs.readdirSync(dirname).filter(file => file.indexOf('.') !== 0)

  return res.json({
    path: dirname,
    files: dir
  })
}

module.exports.upload = (req, res) => {
  upload(req, res, err => {
    if (err instanceof multer.MulterError) {
      // Случилась ошибка Multer при загрузке.
      console.log('error Multer: ', err)
    }

    // Все прекрасно загрузилось.
    return res.json({
      message: "it's work!"
    })
  })
}
