const mongoose = require("mongoose");
const Category = require("../models/Category");

const jewelrySchema = new mongoose.Schema({
  _id: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    required: true,
  },
  firstImageUrl: {
    type: String,
    required: true,
  },
  secondImageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: Number,
    ref: "Category",
    required: true,
  },
});

jewelrySchema.pre("save", async function() {
  const currentId = await setID();

  this._id = currentId;
});

const jewelry = mongoose.model("Jewelry", jewelrySchema);

module.exports = jewelry;

const setID = async () => {
  try {
    let lastObj = await jewelry.findOne().sort({ _id: -1 });

    lastId = lastObj._id;

    nextId = lastId + 1;

    return nextId;
  } catch (err) {
    return 1;
  }
};




// const mongoose = require("mongoose");
// const Category = require("../models/Category");
// const Metal = require("../models/Metal");
// const Size = require("../models/Size");
// const StoneType = require("../models/StoneType");
// const StoneColor = require("../models/StoneColor");

// const jewelrySchema = new mongoose.Schema({
//   _id: {
//     type: Number,
//     default: 0,
//   },
//   title: {
//     type: String,
//     // required: true,
//   },
//   firstImageUrl: {
//     type: String,
//     // required: true,
//   },
//   secondImageUrl: {
//     type: String,
//     // required: true,
//   },
//   price: {
//     type: Number,
//     // required: true,
//   },
//   quantity: {
//     type: Number,
//     // required: true,
//   },
//   category: {
//     type: Number,
//     ref: "Category",
//     // required: true,
//   },
//   metals: [
//     {
//       kind: {
//         type: Number,
//         ref: "Metal",
//         // required: true,
//       },
//       caratWeight: {
//         type: mongoose.Decimal128,
//         required: false,
//       },
//     },
//   ],
//   goldCaratWeight: {
//     type: mongoose.Decimal128,
//     ref: "GoldCaratWeight",
//     required: false,
//   },
//   stones: [
//     {
//       kind: {
//         type: Number,
//         ref: "StoneType",
//         // required: true,
//       },
//       color: {
//         type: Number,
//         ref: "StoneColor",
//         // required: true,
//       },
//       caratWeight: {
//         type: mongoose.Decimal128,
//         required: false,
//       },
//     },
//   ],
//   sizes: [
//     {
//       type: Number,
//       ref: "Size",
//       // required: true,
//     },
//   ],
// });

// jewelrySchema.pre("save", async function() {
//   const currentId = await setID();

//   this._id = currentId;
// });

// const jewelry = mongoose.model("Jewelry", jewelrySchema);

// module.exports = jewelry;

// const setID = async () => {
//   try {
//     let lastObj = await jewelry.findOne().sort({ _id: -1 });

//     lastId = lastObj._id;

//     nextId = lastId + 1;

//     return nextId;
//   } catch (err) {
//     return 1;
//   }
// };

