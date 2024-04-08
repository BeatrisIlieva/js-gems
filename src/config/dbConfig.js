const mongoose = require("mongoose");
const expressConfig = require("./expressConfig");

const uri = "mongodb://127.0.0.1:27017/JSgems";

async function dbConnect() {
    await mongoose.connect(uri);
}

module.exports = dbConnect;