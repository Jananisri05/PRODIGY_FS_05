const mongoose = require("mongoose");
module.exports = mongoose.model("Follow", new mongoose.Schema({
  follower: mongoose.Schema.Types.ObjectId,
  following: mongoose.Schema.Types.ObjectId
}));
