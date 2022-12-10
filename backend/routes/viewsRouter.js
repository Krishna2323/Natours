const express = require("express");
const {
  getOverview,
  getTour,
  getCookie,
} = require("../controllers/viewsController");

const router = express.Router();

router.get("/", getOverview);

router.get("/tour", getTour);

router.get("/cookie", getCookie);

module.exports = router;
