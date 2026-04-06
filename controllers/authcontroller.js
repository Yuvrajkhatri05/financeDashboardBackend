const bcrypt = require("bcrypt");
const { createTokenForUser } = require("../tokenGenerate");
const User = require("../models/user");

// Register Controller
const registerUser = async (req, res) => {
  try {
    const user = req.body;
    if (!user.name || !user.email || !user.password) {
      return res.status(400).json({
        result: false,
        message: "All fields are required",
      });
    }
    const newUser = await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role
    });
    return res.status(201).json({
      status: "Success",
      result: true,
      user: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      result: false,
      message: err.message,
    });
  }
};

// Login Controller
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        result: false,
        message: "Email and password required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        result: false,
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        result: false,
        message: "Invalid email or password",
      });
    }
    const userToken = createTokenForUser(user);
    res.cookie("token", userToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 6 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "Login Success",
      result: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token: userToken,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      message: error.message,
    });
  }
};

// Change User Role (Admin only)
const changeUserRole = async (req, res) => {
  try {
    const admin = await User.findById(req.user._id);

    // Only admin allowed
    if (admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can change roles",
      });
    }

    const { role } = req.body;

    // Validate role
    if (!["viewer", "analyst", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { returnDocument: "after" }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Role updated successfully",
      user: updatedUser,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Change User Status (Admin only)
const changeUserStatus = async (req, res) => {
  try {
    const admin = await User.findById(req.user._id);

    // Only admin allowed
    if (admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can change status",
      });
    }

    const { status } = req.body;

    // Validate status
    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: "after" }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
      user: updatedUser,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get All Users Controller
const getAllUsers = async (req, res) => {
  try {
    const admin = await User.findById(req.user._id);

    if (admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can view users",
      });
    }

    const users = await User.find().select("-password");

    return res.status(200).json({
      success: true,
      users,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  changeUserRole,
  changeUserStatus,
  getAllUsers
};