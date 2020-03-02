const router = require('express').Router()
const CodedError = require('../libraries/CodedError')
const { list, create, remove } = require('../controllers/dynamic.controller')
const verifyAccessToken = require('../middlewares/verifyAccessToken')

router.get('/list', list)
router.post('/create', verifyAccessToken, create)
router.delete(
  '/remove/:id?',
  verifyAccessToken,
  (req, res, next) => {
    if (
      typeof req.params.id !== 'undefined' ||
      (Array.isArray(req.body.list) && req.body.list.length > 0)
    ) {
      return next()
    }

    return next(
      new CodedError('BAD_REQUEST', {
        message: 'Не хватает обязательных полей'
      })
    )
  },
  remove
)

module.exports = router
