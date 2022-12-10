const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Tours = require("./../models/tourModel");
const Booking = require("./../models/bookingModel");

const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const { protect } = require("./authController");
const { createOne } = require("./factoryHandler");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const tour = await Tours.findById(req.params.tourId);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `http://localhost:3000/`,
    cancel_url: `http://localhost:3000/tour/${tour.id}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,

    line_items: [
      {
        name: `${tour.name} Tour`,
        description: tour.summary,
        images: ["https://www.natours.dev/img/tours/tour-2-cover.jpg"],
        amount: tour.price * 100,
        currency: "inr",
        quantity: 1,
      },
    ],
  });

  res.status(200).json({
    success: "true",
    session,
  });
});

exports.createTourBooking = createOne(Booking);

exports.getStripeApi = catchAsync(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_PUBLISHABLE_KEY });
});
