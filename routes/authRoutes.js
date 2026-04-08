const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/userAuthentication");
const { registerUser, loginUser, getAllUsers, changeUserRole, changeUserStatus } = require("../controllers/authcontroller");

// Register Route
router.post("/", registerUser);
/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fullName, email, password]
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               mobileNo:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */

// Login Route
router.post("/login", loginUser);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

// Get all users (Admin)
router.get("/users", userAuth, getAllUsers);
/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       403:
 *         description: Unauthorized
 */

// Change role
router.patch("/users/:id/role", userAuth, changeUserRole);
/**
 * @swagger
 * /auth/users/{id}/role:
 *   patch:
 *     summary: Change user role (Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 example: admin
 *     responses:
 *       200:
 *         description: Role updated
 */

// Change status
router.patch("/users/:id/status", userAuth, changeUserStatus);
/**
 * @swagger
 * /auth/users/{id}/status:
 *   patch:
 *     summary: Change user status (Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: active
 *     responses:
 *       200:
 *         description: Status updated
 */

module.exports = router;
