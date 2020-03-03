const router = require('express').Router()
const verifyAccessToken = require('../middlewares/verifyAccessToken')
const {
  options,
  schema,
  list,
  update
} = require('../controllers/settings.controller')

router.get('/', options)
router.get('/schema', verifyAccessToken, schema)
router.get('/list', verifyAccessToken, list)
router.put('/update', verifyAccessToken, update)

module.exports = router
