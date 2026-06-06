const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");

const {
  getAllStores,
  submitRating,
  updateRating,
  getMyRatings
} = require("../controllers/storeController");

router.get(
  "/",
  authenticate,
  getAllStores
);

router.get(
  "/my-ratings",
  authenticate,
  getMyRatings
);

router.post(
  "/:storeId/rating",
  authenticate,
  submitRating
);


module.exports = router;