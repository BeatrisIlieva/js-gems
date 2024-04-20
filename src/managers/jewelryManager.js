const Jewelry = require("../models/Jewelry");
const StoneType = require("../models/StoneType");
const StoneColor = require("../models/StoneColor");
const { isSelectionEmpty } = require("../utils/checkIfCollectionIsEmpty");
const { updateSelectionQuery } = require("../utils/updateSelectionQuery");
const { getCompositionsCounts } = require("../utils/getCompositionsCounts");
const { getSelectionData } = require("../utils/getSelectionData");

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
    {
      $project: {
        jewelry: "$$ROOT",
        _id: 1,
      },
    },
  ];

  if (!isSelectionEmpty(selection)) {
    query = updateSelectionQuery(selection, query);
  }

  let jewelryData = await Jewelry.aggregate(query);
  let jewelries = jewelryData.map(({ jewelry }) => jewelry);
  let jewelryIds = jewelryData.map(({ _id }) => _id);

  const {metalsData, stoneTypesData} = await getSelectionData(categoryId, jewelryIds);

  return {
    jewelries,
    metalsData,
    stoneTypesData,
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
