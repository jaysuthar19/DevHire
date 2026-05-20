const Notification = require(
  "../models/Notification"
);

const getNotifications = async (
  req,
  res
) => {
  try {
    const notifications =
      await Notification.find({
        user: req.user._id,
      }).sort({
        createdAt: -1,
      });

    res.json(notifications);
  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const markAsRead = async (
  req,
  res
) => {
  try {
    await Notification.findByIdAndUpdate(
      req.params.id,
      {
        read: true,
      }
    );

    res.json({
      message: "Notification read",
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getNotifications,
  markAsRead,
};