const Jewelry = require("../models/Jewelry");
const Category = require("../models/Category");
const Metal = require("../models/Metal");


// exports.getAll = async (categoryId, selection) => {
//   const query = {
//     category: categoryId,
//     quantity: { $gt: 0 },
//   };

//   try {
//     if (selection.length > 0) {
//       query["metals.kind"] = { $in: selection };
//     }
//   } catch (err) {
//     console.log(err.message);
//   }

//   const jewelries = await Jewelry.find(query).lean();
//   return jewelries;
// };

exports.getAll = async (categoryId, selection) => {
  const query = {
    category: categoryId,
    quantity: { $gt: 0 },
  };

  // if (!isSelectionEmpty(selection)) {
  //   aggregatedSelection = getSelectionQuery(selection);
  // }

  const jewelries = await Jewelry.find(query).lean();
  const metals = await getMetalsByTitleAndId(categoryId);
  return {jewelries, metals};
};

async function getMetalsByTitleAndId(categoryId) {
  let metals = await Metal.find().lean();
  for (let i = 0; i < metals.length; i++) {
    const metal = metals[i];
    const metalId = metal._id;
    const count = await getMetalsByCount(categoryId, metalId);
    metal["count"] = count;
  }
  metals = metals.filter(item => item.count !== 0);

  return metals;
};

async function getSelectionQuery (selection) {
  query = {};

  query["metals.kind"] = { $in: selection };
  aggregatedSelection = {};
}; 


function isSelectionEmpty (selection) {
  return Object.keys(selection).length > 0;
};

function isArrayEmpty (array) {
  return array.length < 1;
};

async function getMetalsByCount (categoryId, metalId) {
  const result = await Jewelry.aggregate([
    {
      $match: {
        category: categoryId,
      },
    },
    {
      $match: {
        "metals.kind": metalId,
      },
    },
    {
      $count: "count",
    },
  ]);

  if (!isArrayEmpty(result)){
    const count = Object.values(result[0]).map(Number);
    console.log(count);
    return count[0];
    
  } else {
    return 0;
  }

};

exports.getOne = async (jewelryId) => {
  const jewelry = await Jewelry.findById(jewelryId)
    .populate("category")
    .populate("metals.kind")
    .populate("metals.caratWeight")
    .populate("stones.kind")
    .populate("stones.color")
    .populate("stones.caratWeight")
    .populate("sizes")
    .populate("price")
    .lean();

  return jewelry;
};
exports.getStoneTypesByCount = async (categoryId) => {};
exports.getStoneColorsByCount = async (categoryId) => {};
