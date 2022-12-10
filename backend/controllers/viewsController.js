const Tours = require("./../models/tourModel");
const catchAsync = require("./../utils/catchAsync");

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tours.find();
  res.status(200).render("overview", {
    title: "Overview Page",
    tours,
  });
});

exports.getTour = (req, res, next) => {
  res.status(200).render("tour", {
    title: "The Kailash Hike ",
  });
};

exports.getCookie = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "krishnaninxsxncdc").status(200).json({
    name: "Cookie",
  });
});
