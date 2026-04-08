const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/userAuthentication");
const { getDashboardSummary } = require("../controllers/dashboardcontroller");

// Get Dashboard Summary
router.get("/dashboard/summary", userAuth, getDashboardSummary);
/**
 * @swagger
 * /dashboard/summary:
 *   get:
 *     summary: Get dashboard summary
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data fetched
 */

module.exports = router;
