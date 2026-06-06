const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");

const {
  changePassword,
} = require("../controllers/userController");

router.put(
  "/change-password",
  authenticate,
  changePassword
);

module.exports = router;