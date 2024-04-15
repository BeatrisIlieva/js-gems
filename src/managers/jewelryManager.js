const Jewelry = require("../models/Jewelry");
const Category = require("../models/Category");
const Metal = require("../models/Metal");
const StoneType = require("../models/StoneType");
const StoneColor = require("../models/StoneColor");

exports.getAll = async (categoryId, selection) => {
  const query = {
    category: categoryId,
    quantity: { $gt: 0 },
  };

  // if (!isSelectionEmpty(selection)) {
  //   aggregatedSelection = getSelectionQuery(selection);
  // }

  const jewelries = await Jewelry.find(query).lean();
  let metals = await getCompositionByIdTitleAndCount(categoryId);
  let stoneTypes = await getCompositionByIdTitleAndCount(categoryId);

  return { jewelries, metals, stoneTypes };
};

async function getCompositionByIdTitleAndCount(categoryId) {
  let metals = await Metal.find().lean();
  let stoneTypes = await StoneType.find().lean();
  let stoneColors = await StoneColor.find().lean();

  metalMatchReplacer = "metals.kind";
  metals = await getCompositionsCounts(metals, categoryId, metalMatchReplacer);
  metals = metals.filter((item) => item.count !== 0);

  stoneTypeMatchReplacer = "stones.kind";
  stoneTypes = await getCompositionsCounts(
    stoneTypes,
    categoryId,
    stoneTypeMatchReplacer
  );
  stoneTypes = stoneTypes.filter((item) => item.count !== 0);

  return { metals, stoneTypes };
}

async function getCompositionsCounts(collection, categoryId, matchReplacer) {
  for (let i = 0; i < collection.length; i++) {
    const item = collection[i];
    const itemId = item._id;
    const count = await getCompositionsByCount(
      categoryId,
      itemId,
      matchReplacer
    );
    item["count"] = count;
  }

  return collection;
}

async function getSelectionQuery(selection) {
  query = {};

  query["metals.kind"] = { $in: selection };
  aggregatedSelection = {};
}

function isSelectionEmpty(selection) {
  return Object.keys(selection).length > 0;
}

function isArrayEmpty(array) {
  return array.length < 1;
}

async function getCompositionsByCount(categoryId, itemId, matchReplacer) {
  const result = await Jewelry.aggregate([
    {
      $match: {
        category: categoryId,
      },
    },
    {
      $match: {
        [matchReplacer]: itemId,
      },
    },
    {
      $count: "count",
    },
  ]);

  if (!isArrayEmpty(result)) {
    const count = Object.values(result[0]).map(Number);
    console.log(count);
    return count[0];
  } else {
    return 0;
  }
}

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
