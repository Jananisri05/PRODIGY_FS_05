const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Post",
  new mongoose.Schema({
    userId: String,
    username: String,
    content: String,
    media: String,
    likes: {
      type: Number,
      default: 0
    },
    comments: [
      {
        userId: String,
        username: String,
        text: String
      }
    ]
  })
);

