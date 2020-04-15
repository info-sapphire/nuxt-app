const router = require('express').Router()
const verifyAccessToken = require('../middlewares/verifyAccessToken')

const {
  list: GroupsList,
  create: GroupCreate,
  update: GroupUpdate,
  remove: GroupRemove
} = require('../controllers/group.controller')

router.get('/list', verifyAccessToken, GroupsList)
router.post('/create', verifyAccessToken, GroupCreate)
router.put('/update/:id', verifyAccessToken, GroupUpdate)
router.delete('/remove/:id', verifyAccessToken, GroupRemove)

module.exports = router
