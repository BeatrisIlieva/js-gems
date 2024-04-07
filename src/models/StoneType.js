const mongoose = require("mongoose");

const stoneTypeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const stoneType = mongoose.model("StoneType", stoneTypeSchema);

module.exports = stoneType;
