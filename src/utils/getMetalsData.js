const JewelryMetals = require("../models/JewelryMetals");

exports.getMetalsData = async (jewelryIds) => {
  let jewelryMatchCondition = jewelryIds.reduce((acc, curr) => {
    let jewelryId = curr;
    acc.push({ jewelry: jewelryId });
    return acc;
  }, []);

  let metalsData = await JewelryMetals.aggregate([
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
        $or: jewelryMatchCondition,
      },
    },
    {
      $lookup: {
        as: "metals",
        from: "metals",
        foreignField: "_id",
        localField: "metal",
      },
    },
    {
      $project: {
        "metals._id": 1,
        "metals.title": 1,
      },
    },
    {
      $group: {
        _id: "$metals._id",
        title: {
          $first: "$metals.title",
        },
        count: {
          $count: {},
        },
      },
    },
  ]);

  return metalsData;
};
