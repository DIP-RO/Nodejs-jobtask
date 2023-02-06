const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CreatorSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    profileUrl: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Creator", CreatorSchema);
