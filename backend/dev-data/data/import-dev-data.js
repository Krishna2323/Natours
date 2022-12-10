const dotenv = require("dotenv");
const fs = require("fs");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const Tours = require("./../../models/tourModel");
const User = require("./../../models/userModal");
const Review = require("./../../models/reviewModel");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASS
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTED TO DB");
  });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, "utf-8"));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, "utf-8")
);

const importData = async () => {
  try {
    await Tours.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);

    console.log("Data Updated Successfully");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tours.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log("Data Deleted Successfully");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
}
if (process.argv[2] === "--delete") {
  deleteData();
}

console.log(process.argv);
