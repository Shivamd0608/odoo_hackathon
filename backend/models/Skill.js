const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      default: "Beginner"
    },
    status: {
      type: String,
      enum: ["approved", "rejected", "pending"],
      default: "approved"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);
