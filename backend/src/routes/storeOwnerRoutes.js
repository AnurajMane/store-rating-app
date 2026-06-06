const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  getStoreStats,
  getUsersWhoRated,
} = require("../controllers/storeOwnerController");

router.get(
  "/dashboard",
  authenticate,
  authorize("STORE_OWNER"),
  getStoreStats
);

router.get(
  "/ratings",
  authenticate,
  authorize("STORE_OWNER"),
  getUsersWhoRated
);

module.exports = router;