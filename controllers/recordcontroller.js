const User = require("../models/user");
const Record = require("../models/record");

// Create Record (Admin only)
const createRecord = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const record = req.body;

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    if (!record.userId || !record.amount || !record.type) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const newRecord = await Record.create({
      createdBy: record.userId,
      amount: record.amount,
      type: record.type,
      category: record.category,
      date: record.date,
      notes: record.notes,
    });

    await User.findByIdAndUpdate(
      record.userId,
      { $push: { financialRecords: newRecord._id } },
      { returnDocument: "after" }
    );

    return res.status(201).json({
      success: true,
      message: "Record created",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get Records (Role-based)
const getAllRecords = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const filter = {};
    if (req.query.type) {
      filter.type = req.query.type;
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.startDate || req.query.endDate) {
      filter.date = {};
      if (req.query.startDate) {
        filter.date.$gte = new Date(req.query.startDate);
      }
      if (req.query.endDate) {
        filter.date.$lte = new Date(req.query.endDate);
      }
    }
    // VIEWER → only own records
    if (user.role === "viewer") {
      filter.createdBy = user._id;
      const records = await Record.find(filter).lean();
      return res.status(200).json({
        success: true,
        records,
      });
    }

    // ADMIN / ANALYST → all records
    if (user.role === "admin" || user.role === "analyst") {
      const records = await Record.find(filter)
        .populate("createdBy", "name email")
        .lean();

      return res.status(200).json({
        success: true,
        records,
      });
    }

    return res.status(403).json({
      success: false,
      message: "Unauthorized role",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update Record (Admin only)
const updateRecord = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    const updatedRecord = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );

    if (!updatedRecord) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }

    return res.status(200).json({
      success: true,
      record: updatedRecord,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete Record (Admin only)
const deleteRecord = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    const record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }

    // Remove record reference from user
    await User.findByIdAndUpdate(
      record.createdBy,
      { $pull: { financialRecords: record._id } }
    );

    await Record.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Record deleted",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createRecord,
  getAllRecords,
  updateRecord,
  deleteRecord
};