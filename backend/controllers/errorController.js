const AppError = require("./../utils/appError");

const handleCastErrDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDublicateErr = (err) => {
  const message = `${
    Object.values(err.keyValue)[0]
  } is already a user, try to login.`;
  return new AppError(message, 400);
};

const handleValidationErr = (err) => {
  const errors = Object.values(err.errors).map((el) => el.name);
  console.log(errors);
  const message = `Invalid Input Data`;

  return new AppError(message, 400);
};

const handleInvalidSignature = (err) => {
  const message = `Invalid Signature Please Login Again.`;
  return new AppError(message, 400);
};

const handleTokenExpire = (err) => {
  const message = `Token Expired, Please Login Again.`;
  return new AppError(message, 400);
};

const sendErrDev = (err, res) => {
  console.log(err);
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrProd = (err, res) => {
  console.log(err);
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.mess,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something Went Very Wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  // console.log(err);

  if (process.env.NODE_ENV === "development") {
    sendErrDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    console.log(error);
    if (error.kind === "ObjectId") {
      error = handleCastErrDB(error);
      return sendErrProd(error, res);
    }

    if (error.code === 11000) {
      error = handleDublicateErr(error);
      return sendErrProd(error, res);
    }

    if (error._message === "Validation failed") {
      error = handleValidationErr(error);
      return sendErrProd(error, res);
    }

    if (error.message === "invalid signature") {
      error = handleInvalidSignature(error);
      return sendErrProd(error, res);
    }

    if (error.message === "jwt expired") {
      error = handleTokenExpire(error);
      return sendErrProd(error, res);
    }

    sendErrProd(error, res);
  }
};
