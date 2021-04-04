const User = require('../models/userModel')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require('./handlerFactory')

// HELPERS

const filterObj = (obj, ...fields) => {
  const newObj = {}
  Object.keys(obj).forEach(el => {
    if (fields.includes(el)) {
      newObj[el] = obj[el]
    }
  })

  return newObj
}

// CRUD

exports.getAllUsers = getAll(User)

exports.getUser = getOne(User)

exports.createUser = createOne(User)

exports.updateUser = updateOne(User)

exports.deleteUser = deleteOne(User)

// CUSTOM CONTROLLERS

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates, use /updatePassword',
        400
      )
    )
  }

  const filteredBody = filterObj(req.body, 'name', 'email')

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  })
})

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false })

  res.status(204).json({
    status: 'success',
    data: null,
  })
})

// MIDDLEWARES

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id

  next()
}
