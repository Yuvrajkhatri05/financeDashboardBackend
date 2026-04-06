const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/userAuthentication");
const { createRecord, getAllRecords, updateRecord, deleteRecord } = require("../controllers/recordcontroller");

// Create record (Admin)
router.post("/create", userAuth, createRecord);

// Get records (Role-based)
router.get("/all-records", userAuth, getAllRecords);

// Update record (Admin)
router.patch("/update/:id", userAuth, updateRecord);

// Delete record (Admin)
router.delete("/delete/:id", userAuth, deleteRecord);

module.exports = router;