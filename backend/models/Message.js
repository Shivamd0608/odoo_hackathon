const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  title: String,
  body: String,
  sentAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Message", messageSchema);
