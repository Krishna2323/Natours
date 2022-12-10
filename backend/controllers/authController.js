const User = require("./../models/userModal");
const crypto = require("crypto");
const { promisify } = require("util");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("./../utils/appError");
const sendEmail = require("./email");

const getToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = getToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user: user,
    },
  });
};

exports.loadUser = catchAsync(async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      console.log(decoded);

      const currentUser = await User.findById(decoded.id);
      req.user = currentUser;

      return res.status(200).json({
        status: "success",
        user: currentUser,
      });
    }
    return res.status(404).json({
      status: "fail",
      user: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      user: null,
    });
  }
});

exports.singup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  const newUser = await User.create({
    name: name,
    email: email,
    password: password,
    passwordConfirm: passwordConfirm,
  });

  if (password !== passwordConfirm) {
    return next(new AppError("Passwords Does Not Match", 400));
  }

  createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please Provide Email or Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError("Incorrect Email or Password", 401));
  }

  createSendToken(user, 200, req, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "Logged Out", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError("Please Login To Access This Resource", 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError(
        "The User Belonging To This Token Does No Longer Exist!",
        401
      )
    );
  }

  if (currentUser.passChangeCheck(decoded.iat)) {
    return next(
      new AppError("User Recently Changed Password, Please Login Again", 401)
    );
  }

  req.user = currentUser;

  next();
});

exports.restrictTo = (...role) => {
  return (req, res, next) => {
    console.log(req.user);
    if (!role.includes(req.user.role)) {
      return next(
        new AppError("You Are Not Authorized To Access This Resource")
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("This Is No User Belonging To The Email"));
  }

  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/resetPassword/${resetToken}`;

  const message = `Forgot Your Password? Submit A Patch Request With Your New Password And Confirm Password to: ${resetUrl}.\nIf You Didn't Forgot Your Password Then Please Ignore This Email  `;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your Password Reset Token.(Valid For 10 Minutes)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token Sent To Email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.save({ validateBeforeSave: false });

    return next(
      new AppError("There Was Error Sending Email Please Try Again Later", 500)
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  console.log(hashedToken);

  if (!user) {
    return next(new AppError("Token Invalid Or Has Been Expires", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  if (!(await user.checkPassword(req.body.currentPassword, user.password))) {
    return next(new AppError("Your Current Password Is Wrong ", 201));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  await user.save();

  createSendToken(user, 200, res);
});
