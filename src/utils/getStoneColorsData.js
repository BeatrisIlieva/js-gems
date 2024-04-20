const JewelryStones = require("../models/JewelryStones");

exports.getStoneColorsData = async (jewelryIds) => {
  let jewelryMatchCondition = jewelryIds.reduce((acc, curr) => {
    let jewelryId = curr;
    acc.push({ jewelry: jewelryId });
    return acc;
  }, []);

  let stoneColorsData = await JewelryStones.aggregate([
    [
        {
          $lookup: {
            as: "jewelries",
            from: "jewelries",
            foreignField: "_id",
            localField: "jewelry",
          },
        },
        {
          $lookup: {
            as: "stonecolors",
            from: "stonecolors",
            foreignField: "_id",
            localField: "stoneColor",
          },
        },
        {
          $match: {
            $or: jewelryMatchCondition
          },
        },
        {
          $project: {
            "stonecolors._id": 1,
            "stonecolors.title": 1,
          },
        },
        {
          $group: {
            _id: "$stonecolors._id",
            title: {
                $first: "$stonecolors.title",
              },
            count: {
              $count: {},
            },
          },
        },
      ]
  ]);

  return stoneColorsData;
};
