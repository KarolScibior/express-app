const User = require('../models/userModel')
const APIFeatures = require('../utils/apiFeature')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()

  const users = await features.query

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  })
})

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  })
}

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  })
}

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  })
}

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  })
}
