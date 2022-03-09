const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    username: { type: String, required: true },
    recipient: { type: String, required: true },
    room: { type: String, required: true },
    type: { type: String, required: true },
    data: { type: Object, required: true },
    time: { type: String, required: true },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
