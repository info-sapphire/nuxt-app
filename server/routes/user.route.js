const router = require('express').Router()
const verifyAccessToken = require('../middlewares/verifyAccessToken')

const {
  list: UsersList,
  create: UserCreate,
  update: UserUpdate,
  remove: UserRemove
} = require('../controllers/user.controller')

router.get('/list', verifyAccessToken, UsersList)
router.post('/create', verifyAccessToken, UserCreate)
router.put('/update/:id', verifyAccessToken, UserUpdate)
router.delete('/remove/:id', verifyAccessToken, UserRemove)

module.exports = router
