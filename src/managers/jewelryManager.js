
const Jewelry = require("../models/Jewelry");
const StoneType = require("../models/StoneType");
const StoneColor = require("../models/StoneColor");
const { isSelectionEmpty } = require("../utils/checkIfCollectionIsEmpty");
const { updateSelectionQuery } = require("../utils/updateSelectionQuery");
const { getCompositionsCounts } = require("../utils/getCompositionsCounts");
const {getSelectionData} = require("../utils/getSelectionData");

exports.getAll = async (categoryId, selection) => {
  let query = [
    {
      $match: {
        category: categoryId,
      },
    },
    {
      $lookup: {
        as: "inventories",
        from: "inventories",
        foreignField: "jewelry",
        localField: "_id",
      },
    },
    {
      $match: {
        "inventories.quantity": {
          $gt: 0,
        },
      },
    },
  ];

  if (!isSelectionEmpty(selection)) {
    query = updateSelectionQuery(selection, query);
  }

  let jewelries = await Jewelry.aggregate(query);

  let metalsData = await getSelectionData(categoryId, jewelries);
  // stoneTypesData, stoneColorsData

  

  // metalMatchReplacer = "metals.kind";

  // let metalsByCount = await getCompositionsCounts(
  //   metals,
  //   categoryId,
  //   metalMatchReplacer
  // );

  // metalsByCount = metalsByCount.filter((item) => item.count !== 0);

  const stoneTypes = await StoneType.find().lean();

  stoneTypeMatchReplacer = "stones.kind";

  let stoneTypesByCount = await getCompositionsCounts(
    stoneTypes,
    categoryId,
    stoneTypeMatchReplacer
  );

  stoneTypesByCount = stoneTypesByCount.filter((item) => item.count !== 0);

  const stoneColors = await StoneColor.find().lean();

  stoneColorMatchReplacer = "stones.color";

  let stoneColorsByCount = await getCompositionsCounts(
    stoneColors,
    categoryId,
    stoneColorMatchReplacer
  );

  stoneColorsByCount = stoneColorsByCount.filter((item) => item.count !== 0);

  return {
    jewelries,
    metalsData,
    stoneTypesByCount,
    stoneColorsByCount,
  };
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
