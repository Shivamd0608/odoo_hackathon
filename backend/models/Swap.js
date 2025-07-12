const mongoose = require("mongoose");

const swapSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    offeredSkill: {
      type: String,
      required: true,
    },
    requestedSkill: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "cancelled", "delivered", "confirmed"],
      default: "pending",
    },
    deliveredAt: Date,
    confirmedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Swap", swapSchema);
