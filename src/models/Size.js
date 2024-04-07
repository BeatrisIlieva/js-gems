const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  title: {
    type: mongoose.Decimal128,
    required: true,
  },
});

const size = mongoose.model("Size", sizeSchema);

module.exports = size;
