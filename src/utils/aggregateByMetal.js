const Inventory = require("../models/Inventory");

exports.aggregateByMetal = async (
  metals,
  categoryId,
  jewelriesMatchCondition
) => {
  const metalsData = [];

  metals.reduce(async (acc, curr) => {
    const metalId = curr._id;

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
          as: "jewelrymetals",
          from: "jewelrymetals",
          foreignField: "jewelry",
          localField: "jewelries._id",
        },
      },
      {
        $match: {
          "jewelrymetals.metal": metalId,
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
    acc["id"] = metalId;
    metalsData.push(acc);
    return acc;
  }, {});

  return metalsData;
};
