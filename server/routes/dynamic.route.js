const router = require('express').Router()
const { create } = require('../controllers/dynamic.controller')

router.post('/create', create)

module.exports = router
