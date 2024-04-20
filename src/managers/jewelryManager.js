const Jewelry = require("../models/Jewelry");
const StoneType = require("../models/StoneType");
const StoneColor = require("../models/StoneColor");
const { isSelectionEmpty } = require("../utils/checkIfCollectionIsEmpty");
const { updateSelectionQuery } = require("../utils/updateSelectionQuery");

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
    console.log(selection);
  
    await updateSelectionQuery(selection, query);
  }

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
