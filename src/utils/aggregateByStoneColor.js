const Inventory = require("../models/Inventory");

exports.aggregateByStoneColor = async (
  stoneColors,
  categoryId,
  jewelriesMatchCondition
) => {
  let stoneColorsData = [];

  stoneColors.reduce(async (acc, curr) => {
    let stoneColorId = curr._id;

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
          "jewelrystones.stoneColor": stoneColorId,
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
    acc["id"] = stoneColorId;
    stoneColorsData.push(acc);
    console.log(stoneColorsData)
    return acc;
  }, {});
  
  return stoneColorsData;
};
