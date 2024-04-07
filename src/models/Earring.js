const mongoose = require("mongoose");

const earringSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
    price: Number,
});

const earring = mongoose.model("Earring", earringSchema);

module.exports = earring;