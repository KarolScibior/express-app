const Review = require('../models/reviewModel')
const {
  getOne,
  deleteOne,
  updateOne,
  createOne,
  getAll,
} = require('./handlerFactory')

// CRUD

exports.getAllReviews = getAll(Review)

exports.getReview = getOne(Review)

exports.createReview = createOne(Review)

exports.updateReview = updateOne(Review)

exports.deleteReview = deleteOne(Review)

// MIDDLEWARES

exports.setTourUserIds = (req, res, next) => {
  // nested routes
  if (!req.body.tour) {
    req.body.tour = req.params.tourId
  }

  if (!req.body.user) {
    req.body.user = req.user.id
  }

  next()
}
