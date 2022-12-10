const express = require("express");
const reviewRouter = require("./reviewsRoute");
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  getTopTours,
  getTourStats,
  getMonthlyPlan,
  getToursWithin,
  // checkBody,
} = require("../controllers/toursController");
const { protect, restrictTo } = require("./../controllers/authController");

const router = express.Router();
router.route("/").get(getAllTours);
router.get("/:id", getTour);

router.use("/:tourId/reviews", reviewRouter);

router.route("/top/products").get(getTopTours, getAllTours);

router
  .route("/stats")
  .get(protect, restrictTo("admin", "lead-guide", "guide"), getTourStats);

router
  .route("/tours-within/:distance/center/:latlng/unit/:unit")
  .get(getToursWithin);

router.route("/plans/:year").get(getMonthlyPlan);

router.route("/").post(protect, restrictTo("admin", "lead-guide"), createTour);

router
  .route("/:id")
  .patch(protect, restrictTo("admin", "lead-guide"), updateTour)
  .delete(protect, restrictTo("admin", "lead-guide"), deleteTour);

module.exports = router;
