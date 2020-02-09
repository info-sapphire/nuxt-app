const router = require('express').Router()

const { list, upload } = require('../controllers/media.controller')

router.get('/list', list)
router.post('/upload', upload)

module.exports = router
