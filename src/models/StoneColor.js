const mongoose = require("mongoose");

const stoneColorSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const stoneColor = mongoose.model("StoneColor", stoneColorSchema);

module.exports = stoneColor;
