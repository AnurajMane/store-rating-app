const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  getDashboard,
} = require("../controllers/adminController");

router.get(
  "/dashboard",
  authenticate,
  authorize("ADMIN"),
  getDashboard
);

module.exports = router;