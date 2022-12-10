const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const ApiFeature = require("./../utils/apiFeature");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(
        new AppError(`No Document Found With Id: ${req.params.id}`, 404)
      );
    }

    res.status(204).json({
      status: "success",
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    if (!doc) {
      return next(
        new AppError(`No Document Found With Id: ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, populateObj) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateObj) query = query.populate(populateObj);
    const doc = await query;

    if (!doc) {
      return next(
        new AppError(`No Document Found With Id: ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // let totalProducts = await Model.countDocuments();
    let obj = {};
    if (req.params.tourId) obj = { tour: req.params.tourId };

    const features = new ApiFeature(Model.find(obj), req.query)
      .totalLength()
      .search()
      .filter()
      .sort()
      .setFields();
    const doc = await features.query;

    const pageFiltered = features.pagination();
    const finalProduct = await features.query;

    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: finalProduct,
      },
    });
  });
