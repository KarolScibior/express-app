const express = require('express')

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController')
const {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
} = require('../controllers/authController')

const router = express.Router()

router.post('/sign-up', signUp)
router.post('/login', login)
router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword/:token', resetPassword)
router.patch('/updatePassword', protect, updatePassword)

router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

module.exports = router
