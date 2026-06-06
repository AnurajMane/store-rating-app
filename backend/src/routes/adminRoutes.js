const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  getDashboard,
  createUser,
  getAllUsers,
  createStore,
  getAllStores,
  getUserById,
  getStoreById
} = require("../controllers/adminController");

router.get(
  "/dashboard",
  authenticate,
  authorize("ADMIN"),
  getDashboard
);

router.post(
  "/users",
  authenticate,
  authorize("ADMIN"),
  createUser
);

router.get(
  "/users",
  authenticate,
  authorize("ADMIN"),
  getAllUsers
);

router.post(
  "/stores",
  authenticate,
  authorize("ADMIN"),
  createStore
);

router.get(
  "/stores",
  authenticate,
  authorize("ADMIN"),
  getAllStores
);

router.get(
  "/users/:id",
  authenticate,
  authorize("ADMIN"),
  getUserById
);

router.get(
  "/stores/:id",
  authenticate,
  authorize("ADMIN"),
  getStoreById
);

module.exports = router;