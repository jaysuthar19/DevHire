const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  sendMessage,
  getMessages,
  getConversations,
} = require("../controllers/messageController");

// send message
router.post("/", protect, sendMessage);

// chat history
router.get("/:userId", protect, getMessages);

// inbox / conversations
router.get(
  "/conversations/me",
  protect,
  getConversations
);

module.exports = router;