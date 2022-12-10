const Review = require("./../models/reviewModel");
const catchAsync = require("./../utils/catchAsync");
const { deleteOne, updateOne, createOne, getAll } = require("./factoryHandler");

exports.createReviewBody = (req, res, next) => {
  const reviewBody = {
    review: req.body.review,
    rating: req.body.rating,
    user: req.user.id,
    tour: req.params.tourId,
  };
  req.body = reviewBody;
  next();
};

exports.getAllReviews = getAll(Review);
exports.createReview = createOne(Review);
exports.updateReview = updateOne(Review);
exports.deleteReview = deleteOne(Review);
