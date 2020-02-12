const fs = require('fs')
const path = require('path')
const multer = require('multer')
const upload = require('../middlewares/upload').single('avatar')
const dirname = require('../utils/dirname')

module.exports.list = (req, res) => {
  const { toDir } = req.query
  let uploadDir

  try {
    uploadDir = dirname(__dirname, toDir)
  } catch (e) {
    // invalid dirname
    console.log(e.message)
  }

  // Путь до директории загрузок
  uploadDir = path.join(__dirname, ...uploadDir)

  if (!fs.existsSync(uploadDir)) {
    // error
    return res.json({ error: "dirname doesn't exists" })
  }
  // Директория загрузок
  const dir = fs.readdirSync(uploadDir).filter(file => file.indexOf('.') !== 0)

  return res.json({
    path: uploadDir,
    files: dir
  })
}

module.exports.upload = (req, res) => {
  upload(req, res, err => {
    if (err instanceof multer.MulterError) {
      // Случилась ошибка Multer при загрузке.
      console.log('error Multer: ', err)
    }

    console.log(req.file)

    // Все прекрасно загрузилось.
    return res.json({
      message: "it's work!"
    })
  })
}
