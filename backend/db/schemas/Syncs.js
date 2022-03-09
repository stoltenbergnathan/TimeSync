const mongoose = require("mongoose");
const { Schema } = mongoose;

const SyncsSchema = new Schema(
  {
    username: { type: String, required: true, minlength: 1 },
    syncs: { type: [Object] },
  },
  { timestamps: true }
);

const Syncs = mongoose.model("Syncs", SyncsSchema);
module.exports = Syncs;
