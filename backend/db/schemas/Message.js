const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    username: { type: String, required: true },
    recipient: { type: String, required: true },
    room: { type: String, required: true },
    text: { type: String, required: true },
    time: { type: String, required: true },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
