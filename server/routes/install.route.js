const router = require('express').Router()

const { install } = require('../controllers/install.controller')

router.get('/', install)

module.exports = router
