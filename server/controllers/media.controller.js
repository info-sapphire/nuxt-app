const fs = require('fs')
// const multer = require('multer')
// const upload = require('../middlewares/upload').single('avatar')
const uploadDir = require('../utils/uploadDir')

module.exports.list = (req, res) => {
  const { toDir } = req.query

  try {
    const dirname = uploadDir(__dirname, toDir)
    const dir = fs.readdirSync(dirname).filter(file => file.indexOf('.') !== 0)

    return res.json({
      path: dirname,
      files: dir
    })
  } catch (e) {
    // invalid dirname
    res.json({ message: e.message })
  }
}

module.exports.upload = (req, res) => {
  // upload(req, res, err => {
  //   if (err instanceof multer.MulterError) {
  //     // Случилась ошибка Multer при загрузке.
  //     console.log('error Multer: ', err)
  //   }
  //   console.log(req.file)
  //   // Все прекрасно загрузилось.
  //   return res.json({
  //     message: "it's work!"
  //   })
  // })
}
