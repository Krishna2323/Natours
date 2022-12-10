const mongoose = require("mongoose");
const Tour = require("./tourModel");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Please Enter A Valid Review"],
    },
    rating: {
      type: Number,
      max: 5,
      min: 1,
      required: [true, "Please Enter A Valid Rating"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: "Tours",
      required: [true, "A Review Must Belong To A Tour"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A Review Must Belong To A User"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.statics.createAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: "$tour",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  console.log(stats);

  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: stats[0].avgRating,
      ratingsQuantity: stats[0].nRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: 0,
      ratingsQuantity: 0,
    });
  }
};

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();

  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  if (this.r) {
    await this.r.constructor.createAverageRatings(this.r.tour);
  }
});

reviewSchema.post("save", function () {
  this.constructor.createAverageRatings(this.tour);
});

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo ",
  });

  next();
});

const Reviews = mongoose.model("Reviews", reviewSchema);

module.exports = Reviews;
