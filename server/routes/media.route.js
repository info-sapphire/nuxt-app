const router = require('express').Router()
const verifyAccessToken = require('../middlewares/verifyAccessToken')
const { list, upload } = require('../controllers/media.controller')

router.get('/list', verifyAccessToken, list)
router.post('/upload', verifyAccessToken, upload)

module.exports = router
