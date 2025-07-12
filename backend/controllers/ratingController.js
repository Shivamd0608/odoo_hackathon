const Rating = require("../models/Rating");
const Swap = require("../models/Swap");
const mongoose = require("mongoose");

const giveRating = async (req, res) => {
  const { swapId, rating, feedback } = req.body;

  if (!mongoose.Types.ObjectId.isValid(swapId))
    return res.status(400).json({ message: "Invalid Swap ID" });

  if (rating < 1 || rating > 5)
    return res.status(400).json({ message: "Rating must be between 1 and 5" });

  const swap = await Swap.findById(swapId);
  if (!swap || swap.status !== "confirmed")
    return res.status(400).json({ message: "Swap not found or not confirmed" });

  const rater = req.user._id;
  const ratedUser =
    swap.sender.equals(rater) ? swap.receiver : swap.receiver.equals(rater) ? swap.sender : null;

  if (!ratedUser)
    return res.status(403).json({ message: "You're not part of this swap" });

  const existing = await Rating.findOne({ swapId });
  if (existing)
    return res.status(400).json({ message: "Rating already submitted for this swap" });

  const savedRating = await Rating.create({
    swapId,
    rater,
    ratedUser,
    rating,
    feedback,
  });

  res.status(201).json(savedRating);
};


const getUserRatings = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(400).json({ message: "Invalid User ID" });

  const ratings = await Rating.find({ ratedUser: userId })
    .populate("rater", "name")
    .sort({ createdAt: -1 });

  res.status(200).json(ratings);
};


const getSwapRating = async (req, res) => {
  const { swapId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(swapId))
    return res.status(400).json({ message: "Invalid Swap ID" });

  const rating = await Rating.findOne({ swapId }).populate("rater", "name");

  if (!rating) return res.status(404).json({ message: "No rating found" });

  res.status(200).json(rating);
};


module.exports = { giveRating, getUserRatings, getSwapRating };