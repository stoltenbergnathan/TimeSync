const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true, minlength: 4 },
    email: { type: String, required: true },
    hash: { type: String, required: true },
    salt: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
