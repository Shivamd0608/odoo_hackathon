const User = require("../models/User");
const Swap = require("../models/Swap");
const evaluateBadge = require("../utils/badgeHelper");
const mongoose = require("mongoose");
const Rating = require("../models/Rating");

const exploreUsers = async (req, res) => {
  const { skill } = req.query;

  try {
    const query = skill
      ? { "skills.name": { $regex: skill, $options: "i" }, isPublic: true }
      : { isPublic: true };

    const users = await User.find(query).select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Explore failed", error: err.message });
  }
};


const requestSwap = async (req, res) => {
  const { receiverId, offeredSkill, requestedSkill } = req.body;

  if (!receiverId || !offeredSkill || !requestedSkill)
    return res.status(400).json({ message: "Missing fields" });

  try {
    const swap = await Swap.create({
      sender: req.user._id,
      receiver: receiverId,
      offeredSkill,
      requestedSkill,
    });

    res.status(201).json(swap);
  } catch (err) {
    res.status(500).json({ message: "Swap creation failed", error: err.message });
  }
};


const updateSwapStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["accepted", "rejected", "cancelled"].includes(status))
    return res.status(400).json({ message: "Invalid status" });

  const swap = await Swap.findById(id);
  if (!swap) return res.status(404).json({ message: "Swap not found" });

  // Only sender can cancel, receiver can accept/reject
  if (
    (status === "cancelled" && !swap.sender.equals(req.user._id)) ||
    ((status === "accepted" || status === "rejected") && !swap.receiver.equals(req.user._id))
  ) {
    return res.status(403).json({ message: "Unauthorized action" });
  }

  swap.status = status;
  await swap.save();

  res.status(200).json(swap);
};


const markDelivered = async (req, res) => {
  const { id } = req.params;

  const swap = await Swap.findById(id);
  if (!swap) return res.status(404).json({ message: "Swap not found" });

  if (!swap.sender.equals(req.user._id))
    return res.status(403).json({ message: "Only sender can mark as delivered" });

  swap.status = "delivered";
  swap.deliveredAt = new Date();
  await swap.save();

  res.status(200).json(swap);
};


const confirmDelivery = async (req, res) => {
  const { id } = req.params;

  // 1. Validate swap ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Swap ID" });
  }

  const swap = await Swap.findById(id);
  if (!swap) {
    return res.status(404).json({ message: "Swap not found" });
  }

  // 2. Ensure only receiver can confirm
  if (!swap.receiver.equals(req.user._id)) {
    return res.status(403).json({ message: "Only receiver can confirm delivery" });
  }

  // 3. Update swap status
  swap.status = "confirmed";
  swap.confirmedAt = new Date();
  await swap.save();

  // 4. Update both sender and receiver stats
  const participants = [swap.sender, swap.receiver];
  for (const userId of participants) {
    const user = await User.findById(userId);

    // Increment confirmed swap count
    user.completedSwaps = (user.completedSwaps || 0) + 1;

    // Recalculate average rating
    const ratings = await Rating.find({ ratedUser: user._id });
    const avgRating = ratings.length
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
      : 0;

    user.avgRating = parseFloat(avgRating.toFixed(2));

    // Evaluate and assign badge
    user.badge = evaluateBadge({
      completedSwaps: user.completedSwaps,
      avgRating: user.avgRating,
    });

    await user.save();
  }

  res.status(200).json({ message: "Delivery confirmed and stats updated", swap });
};


const getMySwaps = async (req, res) => {
  const swaps = await Swap.find({
    $or: [{ sender: req.user._id }, { receiver: req.user._id }],
  })
    .populate("sender", "name")
    .populate("receiver", "name")
    .sort({ updatedAt: -1 });

  res.status(200).json(swaps);
};


module.exports = {
  exploreUsers,
  requestSwap,
  updateSwapStatus,
  markDelivered,
  confirmDelivery,
  getMySwaps,
};