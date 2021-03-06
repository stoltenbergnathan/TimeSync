const mongoose = require("mongoose");
const { Schema } = mongoose;

const ActivityDetailsSchema = new Schema(
  {
    username: { type: String, required: true, minlength: 1 },
    title: { type: String, required: true, minlength: 1 },
    genre: { type: String, required: false, minlength: 1 },
    eventUrl: { type: String, required: false, minlength: 0 },
    dateTime: {
      type: Object,
      default: Date.now,
      required: true,
      minlength: 1,
    },
    imageUrl: { type: String, default: "NA", required: false, minlength: 1 },
    kind: { type: String, default: "Activity" },
    visability: { type: String, default: "Public", required: true },
    comments: { type: [Object], default: [] },
  },
  { timestamps: () => Date() }
);

const ActivityDetails = mongoose.model(
  "ActivityDetails",
  ActivityDetailsSchema
);
module.exports = ActivityDetails;
