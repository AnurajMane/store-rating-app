const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

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

router.put(
  "/:storeId/rating",
  authenticate,
  authorize(
    "USER"
  ),
  updateRating
);



module.exports = router;