const router = require('express').Router()

const { upload } = require('../controllers/media.controller')

router.post('/', upload)

module.exports = router
