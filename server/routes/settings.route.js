const router = require('express').Router()
const verifyAccessToken = require('../middlewares/verifyAccessToken')
const { list } = require('../controllers/settings.controller')

router.get('/list', verifyAccessToken, list)

module.exports = router
