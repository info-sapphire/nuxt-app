const router = require('express').Router()
const verifyAccessToken = require('../middlewares/verifyAccessToken')
const {
  options,
  schema,
  list,
  update,
  create
} = require('../controllers/settings.controller')

router.get('/', options)
router.get('/schema', schema)
router.get('/list', verifyAccessToken, list)
router.put('/update', verifyAccessToken, update)
router.post('/create', verifyAccessToken, create)

module.exports = router
