const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const { sendMessage, getMessages } = require("../controllers/chatController");

router.post("/send", auth, sendMessage);           // Fallback for message persistence
router.get("/:swapId", auth, getMessages);         // Fetch chat history

module.exports = router;
