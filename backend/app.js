const express = require("express");
const path = require("path");
const morgan = require("morgan");
const toursRoutes = require("./routes/toursRoute");
const userRoutes = require("./routes/usersRoute");
const reviewsRoutes = require("./routes/reviewsRoute");
const viewsRoutes = require("./routes/viewsRouter");
const bookingRoutes = require("./routes/bookingRoute");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors());

// app.set("view engine", "");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.static(path.join(__dirname, "public")));

app.use(helmet());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  // console.log(req.user);
}

const limiter = rateLimit.rateLimit({
  max: 700,
  windowMs: 60 * 60 * 1000,
  message: "Too Many Request From IP, Plaese Try Again Later After An Hour  ",
});

app.use("/api", limiter);
app.use(express.json());
app.use(mongoSanitize());
app.use(xss());
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

// app.use("/", viewsRoutes);

app.use("/api/v1/tours", toursRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/reviews", reviewsRoutes);
app.use("/api/v1/booking", bookingRoutes);

app.use(express.static(path.join(__dirname,"../frontend/build")))

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"../frontend/build/indes.html"))
})

app.all("*", (req, res, next) => {
  next(
    new AppError(`No Route Found For ${req.originalUrl} In This Server`, 404)
  );
});


app.use(globalErrorHandler);

module.exports = app;
