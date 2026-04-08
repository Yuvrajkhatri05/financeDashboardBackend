const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/userAuthentication");
const { createRecord, getAllRecords, updateRecord, deleteRecord } = require("../controllers/recordcontroller");

// Create record (Admin)
router.post("/create", userAuth, createRecord);
/**
 * @swagger
 * /records/create:
 *   post:
 *     summary: Create financial record (Admin)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount, category, type]
 *             properties:
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               note:
 *                 type: string
 *     responses:
 *       201:
 *         description: Record created
 */

// Get records (Role-based)
router.get("/all-records", userAuth, getAllRecords);
/**
 * @swagger
 * /records/all-records:
 *   get:
 *     summary: Get all records (role-based)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Records fetched
 */

// Update record (Admin)
router.patch("/update/:id", userAuth, updateRecord);
/**
 * @swagger
 * /records/update/{id}:
 *   patch:
 *     summary: Update record (Admin)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Record updated
 */

// Delete record (Admin)
router.delete("/delete/:id", userAuth, deleteRecord);
/**
 * @swagger
 * /records/delete/{id}:
 *   delete:
 *     summary: Delete record (Admin)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Record deleted
 */

module.exports = router;
