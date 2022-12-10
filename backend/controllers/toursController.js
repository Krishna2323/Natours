const fs = require("fs");
const Tours = require("./../models/tourModel");
const ApiFeature = require("./../utils/apiFeature");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require("./factoryHandler");
const { protect } = require("./authController");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getTopTours = (req, res, next) => {
  req.query.limit = 3;
  req.query.sort = "-ratingsAverage,price";
  next();
};

exports.getAllTours = getAll(Tours);

exports.getTour = getOne(Tours, { path: "reviews" });

exports.createTour = createOne(Tours);

exports.updateTour = updateOne(Tours);

exports.deleteTour = deleteOne(Tours);

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tours.aggregate([
    {
      $match: { ratingsAverage: { $gte: 3 } },
    },
    {
      $group: {
        _id: { $toUpper: "$difficulty" },
        numTours: { $sum: 1 },
        numRatings: { $sum: "$ratingsQuantity" },
        avgRating: { $avg: "$ratingsAverage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    stats,
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;

  const plan = await Tours.aggregate([
    {
      $unwind: "$startDates",
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$startDates" },
        numTourStarts: { $sum: 1 },
        tours: { $push: "$name" },
      },
    },
    {
      $addFields: { month: "$_id" },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { numTourStarts: -1 },
    },
  ]);
  res.status(200).json({
    status: "success",
    plan,
  });
});

exports.getToursWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(",");

  const radius = unit === "mi" ? distance / 3963.2 : distance / 6378.1;

  if (!lat || !lng) {
    next(
      new AppError(
        "Please Provide Latitude And Longitude In The Format :lat,lng"
      )
    );
  }

  const tours = await Tours.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    status: "success",
    results: tours.length,
    data: tours,
  });
});
