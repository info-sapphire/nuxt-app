const router = require('express').Router()
const verifyAccessToken = require('../middlewares/verifyAccessToken')
const {
  list,
  //   update,
  create,
  groupsList,
  createGroup,
  updateGroup,
  removeGroup
} = require('../controllers/users.controller')

router.get('/list', verifyAccessToken, list)
// router.put('/update', verifyAccessToken, update)
router.post('/create', verifyAccessToken, create)

router.get('/groups/list', verifyAccessToken, groupsList)
router.post('/groups/create', verifyAccessToken, createGroup)
router.put('/groups/update/:id', verifyAccessToken, updateGroup)
router.delete('/groups/remove/:id', verifyAccessToken, removeGroup)

module.exports = router
