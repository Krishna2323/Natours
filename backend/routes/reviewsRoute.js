const express = require("express");
const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  createReviewBody,
} = require("./../controllers/reviewController");

const { protect, restrictTo } = require("./../controllers/authController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getAllReviews)
  .post(protect, restrictTo("user"), createReviewBody, createReview);
router.use(protect);

router.use(restrictTo("admin"));

router.route("/:id").delete(deleteReview).patch(updateReview);

module.exports = router;
