const Jewelry = require("../models/Jewelry");
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
    // {
    //   $group: {
    //     _id: null,
    //     price: {
    //       $first: {"$inventories.price"},
    //     },
    //   },
    // },
    // {
    //   $addFields: {
    //     price: "$inventories.price"
    //   }
    // },
    {
      $project: {
        price: "$inventories.price",
        firstImageUrl: 1,
      },
    },
  ]
  // let query = [
  //   {
  //     $match: {
  //       category: categoryId,
  //     },
  //   },
  //   {
  //     $lookup: {
  //       as: "inventories",
  //       from: "inventories",
  //       foreignField: "jewelry",
  //       localField: "_id",
  //     },
  //   },
  //   {
  //     $match: {
  //       "inventories.quantity": {
  //         $gt: 0,
  //       },
  //     },
  //   },
  //   {
  //     $project: {
  //       "inventories.price": 1,
  //     },
  //   },
  // ];

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
              metal: {
                $arrayElemAt: [
                  "$metals",
                  { $indexOfArray: ["$metals._id", "$$jm.metal"] },
                ],
              },
              caratWeight: "$$jm.caratWeight",
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
      $addFields: {
        stoneInfo: {
          $map: {
            input: "$jewelrystones",
            as: "js",
            in: {
              stoneType: {
                $arrayElemAt: [
                  "$stonetypes.title",
                  { $indexOfArray: ["$stonetypes._id", "$$js.stoneType"] },
                ],
              },
              stoneColor: {
                $arrayElemAt: [
                  "$stonecolors.title",
                  { $indexOfArray: ["$stonecolors._id", "$$js.stoneColor"] },
                ],
              },
              caratWeight: "$$js.caratWeight",
            },
          },
        },
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
        "metalInfo.metal.title": 1,
        "metalInfo.caratWeight": 1,
        "stoneInfo.stoneType": 1,
        "stoneInfo.stoneColor": 1,
        "stoneInfo.caratWeight": 1,

        "sizes.measurement": 1,
        "sizes._id": 1,
      },
    },
    {
      $match: {
        _id: jewelryId, // Assuming _id is a number, not a string with "NumberInt"
      },
    },
  ]);
  return jewelry;
};
