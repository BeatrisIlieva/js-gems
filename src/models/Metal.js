const mongoose = require("mongoose");

const metalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const metal = mongoose.model("Metal", metalSchema);

module.exports = metal;
