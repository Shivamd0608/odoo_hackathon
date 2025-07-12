const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    swapId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Swap",
      required: true,
      unique: true, // Only one rating per swap
    },
    rater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ratedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    feedback: {
      type: String,
      maxlength: 1000,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rating", ratingSchema);
