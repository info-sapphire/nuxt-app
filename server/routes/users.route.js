const router = require('express').Router()
const verifyAccessToken = require('../middlewares/verifyAccessToken')
const {
  //   options,
  //   list,
  //   update,
  //   create,
  groupsList,
  createGroup
} = require('../controllers/users.controller')

// router.get('/', options)
// router.get('/list', verifyAccessToken, list)
// router.put('/update', verifyAccessToken, update)
// router.post('/create', verifyAccessToken, create)

router.get('/groups/list', verifyAccessToken, groupsList)
router.post('/groups/create', verifyAccessToken, createGroup)

module.exports = router
