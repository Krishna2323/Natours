const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception!!! Shutting Down.....");

  console.log(err);

  process.exit(1);
});

if (process.env.NODE_ENV === "development") {
dotenv.config({ path: "./config.env" });
}

const app = require("./app");

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

const server = app.listen(4000, () => {
  console.log("Server Running At 4000");
  console.log(server.address().port);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Promise!!! Shutting Down.....");

  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
