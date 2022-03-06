const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const messageSchema = new Schema(
  {
    username: { type: String, required: true },
    text: { type: String, required: true, minlength: 1 },
    time: { type: String, required: true },
  },
  { timestamps: true }
);

messageSchema.plugin(passportLocalMongoose);
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
