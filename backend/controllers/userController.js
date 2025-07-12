const User = require("../models/User");

// GET /api/user/me
const getMe = async (req, res) => {
  res.status(200).json(req.user);
};

// PATCH /api/user/me
const updateProfile = async (req, res) => {
  try {
    const updates = req.body;

    // Prevent critical fields from being changed
    delete updates.password;
    delete updates.email;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

module.exports = {
  getMe,
  updateProfile,
};
