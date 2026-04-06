const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/userAuthentication");
const { getDashboardSummary } = require("../controllers/dashboardcontroller");

// Get Dashboard Summary
router.get("/dashboard/summary", userAuth, getDashboardSummary);

module.exports = router;