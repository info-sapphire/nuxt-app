const router = require('express').Router()

const { login } = require('../controllers/user.controller')

router.post('/login', login)

module.exports = router
