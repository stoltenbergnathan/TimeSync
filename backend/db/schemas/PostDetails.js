const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostDetailsSchema = new Schema({
  username: { type: String, required: true, minlength: 1 },
  title: { type: String, required: true, minlength: 1 },
  genre: { type: String, required: true, minlength: 1 },
  dateTime: { type: Object, required: true, minlength: 1 },
  eventUrl: { type: String, required: true, minlength: 1 },
  imageUrl: { type: String, required: true, minlength: 1 },
});

const PostDetails = mongoose.model("PostDetails", PostDetailsSchema);
module.exports = PostDetails;
