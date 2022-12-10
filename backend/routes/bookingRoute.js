const express = require("express");
const {
  getCheckoutSession,
  getStripeApi,
  createTourBooking,
} = require("../controllers/bookingController");
const { protect, restrictTo } = require("./../controllers/authController");

const router = express.Router();

router.get("/checkout-session/:tourId", protect, getCheckoutSession);
router.get("/stripe-api-key", protect, getStripeApi);
// router.post("/newBooking", protect, createTourBooking);

module.exports = router;
