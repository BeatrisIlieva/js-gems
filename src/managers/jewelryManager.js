const Jewelry = require("../models/Jewelry");
const StoneType = require("../models/StoneType");
const StoneColor = require("../models/StoneColor");
const {
  isSelectionEmpty,
  isArrayEmpty,
} = require("../utils/checkIfCollectionIsEmpty");
const { updateSelectionQuery } = require("../utils/updateSelectionQuery");
const {updateQueryByJewelryIds} = require("../utils/updateQueryByJewelryIds");

exports.getAll = async (categoryId) => {
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

  const jewelries = await Jewelry.aggregate(query);
  return jewelries;
};

exports.getFiltered = async (jewelryIds, selection) => {
  const selectionQuery = await updateSelectionQuery(selection);
  const queryByJewelryIds = await updateQueryByJewelryIds(jewelryIds);
  const query = [...selectionQuery, ...queryByJewelryIds];

  let jewelries = await Jewelry.aggregate(query);

  return jewelries;
};

exports.getOne = async (jewelryId) => {
  const jewelry = await Jewelry.findById(jewelryId)
    .populate("category")
    .populate("jewelrymetals")
    // .populate("metals.caratWeight")
    .populate("jewelrystones")
    // .populate("stones.color")
    // .populate("stones.caratWeight")
    // .populate("sizes")
    // .populate("price")
    .lean();

  return jewelry;
};
