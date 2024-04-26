const mongoose = require("mongoose");
const expressConfig = require("../../src/config/expressConfig");

const uri = "mongodb://127.0.0.1:27017/TestDatabaseJSGems";

async function dbConnect() {
  await mongoose.connect(uri);
}

module.exports = dbConnect;
