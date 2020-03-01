const router = require('express').Router()
const { create } = require('../controllers/dynamic.controller')
const verifyAccessToken = require('../middlewares/verifyAccessToken')

router.post('/create', verifyAccessToken, create)

module.exports = router
