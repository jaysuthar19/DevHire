const Message = require(
  "../models/Message"
);

const Notification = require(
  "../models/Notification"
);

const Conversation = require("../models/Conversation");

// SEND MESSAGE
const sendMessage = async (req, res) => {
  try {
    const { receiver, text } = req.body;

    const message = await Message.create({
      sender: req.user._id,
      receiver,
      text,
    });

    // CREATE OR UPDATE CONVERSATION
    let convo = await Conversation.findOne({
      participants: {
        $all: [req.user._id, receiver],
      },
    });

    if (!convo) {
      convo = await Conversation.create({
        participants: [req.user._id, receiver],
        lastMessage: text,
      });
    } else {
      convo.lastMessage = text;
      convo.updatedAt = new Date();
      await convo.save();
      await Notification.create({
  user: receiver,
  text: "New message received 💬",
});
    }

    res.json(message);
  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const getConversations = async (req, res) => {
  try {
    const convos = await Conversation.find({
      participants: req.user._id,
    })
      .populate("participants", "name")
      .sort({ updatedAt: -1 });

    res.json(convos);
  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

// GET CHAT HISTORY
const getMessages = async (
  req,
  res
) => {
  try {
    const messages =
      await Message.find({
        $or: [
          {
            sender: req.user._id,
            receiver:
              req.params.userId,
          },
          {
            sender:
              req.params.userId,
            receiver: req.user._id,
          },
        ],
      })
        .sort({
          createdAt: 1,
        })
        .populate(
          "sender",
          "name"
        );

    res.json(messages);
  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  sendMessage,
  getMessages,
  getConversations,
};