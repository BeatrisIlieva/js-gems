const mongoose = require("mongoose");

const metalSchema = new mongoose.Schema({
  _id: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    required: true,
  },
});

metalSchema.pre("save", async function() {
  const currentId = await setID();

  this._id = currentId;
});

const metal = mongoose.model("Metal", metalSchema);

module.exports = metal;

const setID = async () => {
  try {
    let lastObj = await metal.findOne().sort({ _id: -1 });

    lastId = lastObj._id;

    nextId = lastId + 1;

    return nextId;
  } catch (err) {
    return 1;
  }
};
