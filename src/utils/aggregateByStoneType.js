const Inventory = require("../models/Inventory");

exports.aggregateByStoneType = async (
  stoneTypes,
  categoryId,
  jewelriesMatchCondition
) => {
  let stoneTypesData = [];

  stoneTypes.reduce(async (acc, curr) => {
    let stoneTypeId = curr._id;

    count = await Inventory.aggregate([
      {
        $lookup: {
          as: "jewelries",
          from: "jewelries",
          foreignField: "_id",
          localField: "jewelry",
        },
      },
      {
        $match: {
          "jewelries.category": categoryId,
        },
      },
      ...jewelriesMatchCondition,
      {
        $match: {
          quantity: {
            $gt: Number("0"),
          },
        },
      },
      {
        $lookup: {
          as: "jewelrystones",
          from: "jewelrystones",
          foreignField: "jewelry",
          localField: "jewelries._id",
        },
      },
      {
        $match: {
          "jewelrystones.stoneType": stoneTypeId,
        },
      },
      {
        $group: {
          _id: "$_id",
          count: {
            $count: {},
          },
        },
      },
    ]);

    if (count.length < 1) {
      return acc;
    }
    acc["title"] = curr.title;
    acc["count"] = count.length;
    acc["id"] = stoneTypeId;
    stoneTypesData.push(acc);
    return acc;
  }, {});

  return stoneTypesData;
};
