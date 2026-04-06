const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/userAuthentication");
const { registerUser, loginUser, getAllUsers, changeUserRole, changeUserStatus } = require("../controllers/authcontroller");

// Register Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

// Get all users (Admin)
router.get("/users", userAuth, getAllUsers);

// Change role
router.patch("/users/:id/role", userAuth, changeUserRole);

// Change status
router.patch("/users/:id/status", userAuth, changeUserStatus);

module.exports = router;