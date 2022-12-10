const multer = require("multer");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const User = require("./../models/userModal");
const { deleteOne, updateOne, getAll, getOne } = require("./factoryHandler");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../page/src/components/assests/users");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not An Image!", 400));
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  console.log(req.user);
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("This Route Is Not For Password Updates", 400));
  }

  const filteredBody = filterObj(req.body, "name", "email");

  if (req.file) filteredBody.photo = req.file.filename;

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    status: "success",
    data: { user: updatedUser },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({
    status: "success",
  });
});

exports.getAllUsers = getAll(User);

exports.getUser = getOne(User);

exports.updateUser = updateOne(User);

exports.deleteUser = deleteOne(User);

// exports.deleteUser = (req, res) => {
//   res.status(200).json({
//     status: "success",
//     results: `${req.params.id} USER`,
//   });
// };
