const router = require('express').Router()
const verifyAccessToken = require('../middlewares/verifyAccessToken')
const { schema, update } = require('../controllers/settings.controller')

router.get('/schema', verifyAccessToken, schema)
router.put('/update', verifyAccessToken, update)

module.exports = router
