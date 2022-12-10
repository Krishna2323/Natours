const mongoose = require("mongoose");
const slugify = require("slugify");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A Tour Must Have A Name"],
      unique: true,
      trim: true,
      minlength: [7, "Name Must Be Atleast 7 Characters Long"],
      maxlength: [30, "Name Must Be Exceed 30 Characters"],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, "A Tour Must Have A Duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A Tour Must Have A Max Group Size"],
    },
    difficulty: {
      type: String,
      required: [true, "A Tour Must Have A Difficulty"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty is either: easy, medium, difficult",
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1.0, "Rating Must Be Above 1.0"],
      max: [5.0, "Rating Must Be Below 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "A Tour Must Have A Price"],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, "A Tour Must Have A Summary"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A Tour Must Have A Cover Image"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      deafault: false,
    },
    startLocation: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: "Point",
          enum: ["Point"],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.index({
  price: -1,
  ratingsAverage: 1,
  slug: 1,
});

tourSchema.index({
  startLocation: "2dsphere",
});

tourSchema.virtual("durationWeek").get(function () {
  return this.duration / 7;
});

tourSchema.virtual("reviews", {
  ref: "Reviews",
  foreignField: "tour",
  localField: "_id",
});

tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.pre(/^f/, function (next) {
  this.populate({
    path: "guides",
    select: "-__v -passwordChangedAt",
  });
  next();
});

tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

tourSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});
const Tours = mongoose.model("Tours", tourSchema);

module.exports = Tours;
