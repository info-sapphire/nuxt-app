const router = require('express').Router()
const { check } = require('express-validator')
const { create, login } = require('../controllers/users.controller')

router.post(
  '/create',
  [
    check('email', 'Некорректный email').isEmail(),
    check('passwd', 'Минимальная длина пароля 6 символов').isLength({
      min: 6
    })
  ],
  create
)

router.post(
  '/login',
  [
    check('email', 'Введите корректный email')
      .normalizeEmail()
      .isEmail(),
    check('passwd', 'Введите пароль').exists()
  ],
  login
)

module.exports = router
