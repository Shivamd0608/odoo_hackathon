const Chat = require("../models/Chat");
const Swap = require("../models/Swap");
const mongoose = require("mongoose");

const sendMessage = async (req, res) => {
  const { swapId, message } = req.body;

  if (!mongoose.Types.ObjectId.isValid(swapId))
    return res.status(400).json({ message: "Invalid swapId" });

  const swap = await Swap.findById(swapId);
  if (!swap) return res.status(404).json({ message: "Swap not found" });

  const userId = req.user._id;
  if (!swap.sender.equals(userId) && !swap.receiver.equals(userId))
    return res.status(403).json({ message: "You are not part of this swap" });

  const newMsg = await Chat.create({ swapId, sender: userId, message });
  res.status(201).json(newMsg);
};

const getMessages = async (req, res) => {
  const { swapId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(swapId))
    return res.status(400).json({ message: "Invalid swapId" });

  const swap = await Swap.findById(swapId);
  if (!swap) return res.status(404).json({ message: "Swap not found" });

  const userId = req.user._id;
  if (!swap.sender.equals(userId) && !swap.receiver.equals(userId))
    return res.status(403).json({ message: "Unauthorized" });

  const messages = await Chat.find({ swapId })
    .sort({ createdAt: 1 })
    .populate("sender", "name");

  res.status(200).json(messages);
};

module.exports = { sendMessage, getMessages };
