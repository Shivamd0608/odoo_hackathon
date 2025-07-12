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

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password -friends -isBanned");
    if (!user || !user.isPublic) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

const addSkill = async (req, res) => {
  const { name, type } = req.body;

  if (!name || !type || !["offered", "wanted"].includes(type)) {
    return res.status(400).json({ message: "Invalid skill data" });
  }

  const user = await User.findById(req.user._id);
  user.skills.push({ name, type });
  await user.save();

  res.status(200).json(user.skills);
};

const deleteSkill = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.skills = user.skills.filter(skill => skill._id.toString() !== req.params.skillId);
    await user.save();

    res.status(200).json(user.skills);
  } catch (err) {
    res.status(500).json({ message: "Failed to delete skill", error: err.message });
  }
};


module.exports = {
  getMe,
  updateProfile,
  getUserById,
  addSkill,
  deleteSkill
};
