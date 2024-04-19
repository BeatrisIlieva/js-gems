const Metal = require("../models/Metal");
const Inventory = require("../models/Inventory");

exports.getSelectionData = async (categoryId, jewelries) => {
  const metals = await Metal.find().lean();
  const array = jewelries.map(jewelry => jewelry._id);

  let metalsData = [];
  const jewelriesMatchCondition = [];

  const matchCondition = {};
if (array.length < 2) {
  
  matchCondition["jewelries._id"] = Number(array);
  jewelriesMatchCondition.push({
    $match: {
      "jewelries._id": array[0],
    },
  });
} else {
  const matchConditions = array.map((x) => ({
    "jewelries._id": x,
  }));

  jewelriesMatchCondition.push({
    $match: {
      $or: matchConditions,
    },
  });
}


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
