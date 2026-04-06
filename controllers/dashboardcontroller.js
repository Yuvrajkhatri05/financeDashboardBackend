const User = require("../models/user");
const Record = require("../models/record");


// Get Dashboard Summary Routes
const getDashboardSummary = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    let matchStage = {};
    // Viewer → only own data
    if (user.role === "viewer") {
      matchStage.createdBy = user._id;
    }

    // 1. Total Income & Expense
    const totals = await Record.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" }
        }
      }
    ]);
    let totalIncome = 0;
    let totalExpense = 0;
    totals.forEach(t => {
      if (t._id === "income") totalIncome = t.total;
      if (t._id === "expense") totalExpense = t.total;
    });

    // 2. Category-wise totals
    const categoryWise = await Record.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      }
    ]);

    // 3. Recent transactions
    const recentTransactions = await Record.find(matchStage)
      .sort({ date: -1 })
      .limit(5)
      .lean();
    return res.status(200).json({
      success: true,
      totalIncome,
      totalExpense,
      netBalance: totalIncome - totalExpense,
      categoryWise,
      recentTransactions
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = {
  getDashboardSummary
};