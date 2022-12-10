const express = require("express");
const {
  getAllUsers,
  createUser,
  updateUser,
  getUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
  uploadUserPhoto,
} = require("../controllers/usersController");
const {
  singup,
  login,
  protect,
  forgotPassword,
  resetPassword,
  updatePassword,
  restrictTo,
  loadUser,
  logout,
} = require("./../controllers/authController");

const router = express.Router();

router.post("/singup", singup);
router.post("/login", login);
router.get("/loaduser", loadUser);
router.get("/logout", logout);

router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

router.use(protect);

router.get("/me", getMe, getUser);
router.patch("/updateMe", uploadUserPhoto, updateMe);
router.delete("/deleteMe", deleteMe);

router.patch("/updateMyPassword", updatePassword);

// router.use(restrictTo("admin"));

router.route("/").get(getAllUsers);
router.route("/:id").get(getUser).patch(updateUser).post(deleteUser);

module.exports = router;
