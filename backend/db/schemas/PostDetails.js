const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostDetailsSchema = new Schema(
  {
    username: { type: String, required: true, minlength: 1 },
    title: { type: String, required: true, minlength: 1 },
    genre: { type: String, required: true, minlength: 1 },
    dateTime: { type: Object, required: true, minlength: 1 },
    eventUrl: { type: String, required: true, minlength: 0 },
    imageUrl: { type: String, required: true, minlength: 1 },
    kind: { type: String, default: "Event" },
    visability: { type: String, default: "Public", required: true },
  },
  { timestamps: true }
);

const PostDetails = mongoose.model("PostDetails", PostDetailsSchema);
module.exports = PostDetails;
