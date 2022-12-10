const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: "Tours",
    required: [true, "A Booking Must Belong To A Tour"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A Booking Must Belong To A User"],
  },
  price: {
    type: Number,
    require: [true, "A Booking Must Have A Price"],
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

bookingSchema.pre("/^find/", function (next) {
  this.populate("user").populate({
    path: "tour",
    select: "name",
  });
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
