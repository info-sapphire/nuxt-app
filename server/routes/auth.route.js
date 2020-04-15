const router = require('express').Router()
const { login: LoginController } = require('../controllers/auth.controller')
const { login: LoginValidator } = require('../validators/auth.validate')

router.post('/login', LoginValidator, LoginController)

module.exports = router
