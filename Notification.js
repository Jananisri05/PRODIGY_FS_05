const mongoose = require("mongoose");

module.exports = mongoose.model("Notification",
  new mongoose.Schema({
    to: String,
    from: String,
    type: String,
    postId: String,
    createdAt: { type: Date, default: Date.now }
  })
);
