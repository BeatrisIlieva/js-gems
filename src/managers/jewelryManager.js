const Jewelry = require("../models/Jewelry");
const StoneType = require("../models/StoneType");
const StoneColor = require("../models/StoneColor");
const {
  isSelectionEmpty,
  isArrayEmpty,
} = require("../utils/checkIfCollectionIsEmpty");
const { updateSelectionQuery } = require("../utils/updateSelectionQuery");
const { updateQueryByJewelryIds } = require("../utils/updateQueryByJewelryIds");

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
  const jewelry = await Jewelry.aggregate([
    {
      $lookup: {
        as: "categories",
        from: "categories",
        foreignField: "_id",
        localField: "category",
      },
    },
    {
      $lookup: {
        as: "jewelrymetals",
        from: "jewelrymetals",
        foreignField: "jewelry",
        localField: "_id",
      },
    },
    {
      $lookup: {
        as: "metals",
        from: "metals",
        foreignField: "_id",
        localField: "jewelrymetals.metal",
      },
    },
    {
      $addFields: {
        metalInfo: {
          $map: {
            input: "$jewelrymetals",
            as: "jm",
            in: {
              $mergeObjects: [
                {
                  $arrayElemAt: [
                    "$metals",
                    {
                      $indexOfArray: ["$metals._id", "$$jm.metal"],
                    },
                  ],
                },
                { caratWeight: "$$jm.caratWeight" },
              ],
            },
          },
        },
      },
    },
    {
      $lookup: {
        as: "jewelrystones",
        from: "jewelrystones",
        foreignField: "jewelry",
        localField: "_id",
      },
    },
    {
      $lookup: {
        as: "stonetypes",
        from: "stonetypes",
        foreignField: "_id",
        localField: "jewelrystones.stoneType",
      },
    },
    {
      $lookup: {
        as: "stonecolors",
        from: "stonecolors",
        foreignField: "_id",
        localField: "jewelrystones.stoneColor",
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
      $lookup: {
        as: "sizes",
        from: "sizes",
        foreignField: "_id",
        localField: "inventories.size",
      },
    },
    {
      $project: {
        title: 1,
        firstImageUrl: 1,
        secondImageUrl: 1,
        "categories.title": 1,
        "metalInfo.title": 1,
        "metalInfo.caratWeight": 1,
        "stonetypes.title": 1,
        "stonecolors.title": 1,
        "jewelrystones.caratWeight": 1,
        "inventories.size": 1,
        "inventories.quantity": 1,
        "inventories.price": 1,
      },
    },
    {
      $match: {
        _id: jewelryId,
      },
    },
  ]);
  return jewelry;
  a;
};

// exports.getOne = async (jewelryId) => {
//   const jewelry = await Jewelry.findById(jewelryId)
//     .populate("category")
//     .populate("jewelrymetals")
//     // .populate("metals.caratWeight")
//     .populate("jewelrystones")
//     // .populate("stones.color")
//     // .populate("stones.caratWeight")
//     // .populate("sizes")
//     // .populate("price")
//     .lean();

//   return jewelry;
// };
