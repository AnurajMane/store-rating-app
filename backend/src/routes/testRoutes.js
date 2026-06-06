const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.get(
  "/admin-only",
  authenticate,
  authorize("ADMIN"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
    });
  }
);

router.get(
  "/user-only",
  authenticate,
  authorize("USER"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome User",
    });
  }
);

module.exports = router;