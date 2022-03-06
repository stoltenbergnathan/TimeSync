const mongoose = require("mongoose");
const { Schema } = mongoose;

const FriendInfoSchema = new Schema({
  username: { type: String, required: true, minlength: 1 },
  requests: { type: [String], default: [] },
  friendList: { type: [String], default: [] },
});

const FriendInfo = mongoose.model("FriendInfo", FriendInfoSchema);
module.exports = FriendInfo;
