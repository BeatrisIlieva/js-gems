const Jewelry = require("../models/Jewelry");
const { updateSelectionQuery } = require("../utils/updateSelectionQuery");
const { updateQueryByJewelryIds } = require("../utils/updateQueryByJewelryIds");

exports.getAll = async (jewelryIds, selectionQuery, limit) => {
  const queryByJewelryIds = await updateQueryByJewelryIds(jewelryIds);
  let query = [
    ...queryByJewelryIds,
    ...selectionQuery,
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
        as: "categories",
        from: "categories",
        foreignField: "_id",
        localField: "category",
      },
    },
    {
      $group: {
        _id: "$_id",
        price: {
          $first: {
            $arrayElemAt: ["$inventories.price", 0],
          },
        },
        firstImageUrl: {
          $addToSet: "$firstImageUrl",
        },
        jewelryIds: {
          $push: "$_id",
        },
        categoryTitle: {
          $addToSet: "$categories.title",
        },
        jewelryTitle: {
          $addToSet: "$title",
        },
        inventories: {
          $push: "$inventories",
        },
      },
    },
    {
      $addFields: {
        isSoldOut: {
          $reduce: {
            input: "$inventories",
            initialValue: true,
            in: {
              $and: [
                "$$value",
                {
                  $eq: [
                    {
                      $size: {
                        $filter: {
                          input: "$$this",
                          as: "inv",
                          cond: {
                            $gt: ["$$inv.quantity", 0],
                          },
                        },
                      },
                    },
                    0,
                  ],
                },
              ],
            },
          },
        },
      },
    },
    {
      $project: {
        price: 1,
        firstImageUrl: 1,
        jewelryIds: 1,
        categoryTitle: 1,
        jewelryTitle: 1,
        isSoldOut: 1,
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
    {
      $limit: limit,
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
              metal: {
                $arrayElemAt: [
                  "$metals",
                  {
                    $indexOfArray: ["$metals._id", "$$jm.metal"],
                  },
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
                  {
                    $indexOfArray: ["$stonetypes._id", "$$js.stoneType"],
                  },
                ],
              },
              stoneColor: {
                $arrayElemAt: [
                  "$stonecolors.title",
                  {
                    $indexOfArray: ["$stonecolors._id", "$$js.stoneColor"],
                  },
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
      $addFields: {
        price: {
          $arrayElemAt: ["$inventories.price", 0],
        },
      },
    },
    {
      $addFields: {
        sizes: {
          $map: {
            input: "$sizes",
            as: "size",
            in: {
              $cond: {
                if: {
                  $gt: [
                    {
                      $size: {
                        $filter: {
                          input: "$inventories",
                          as: "inventory",
                          cond: {
                            $and: [
                              {
                                $eq: ["$$inventory.size", "$$size._id"],
                              },
                              {
                                $gt: ["$$inventory.quantity", 0],
                              },
                            ],
                          },
                        },
                      },
                    },
                    0,
                  ],
                },
                then: "$$size",
                else: "$$REMOVE",
              },
            },
          },
        },
      },
    },
    {
      $project: {
        title: 1,
        price: 1,
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
        _id: jewelryId,
      },
    },
  ]);
  return jewelry;
};
