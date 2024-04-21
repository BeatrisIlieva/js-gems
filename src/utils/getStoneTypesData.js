// const JewelryStones = require("../models/JewelryStones");

// exports.getStoneTypesData = async (jewelryIds) => {
//   let jewelryMatchCondition = jewelryIds.reduce((acc, curr) => {
//     let jewelryId = curr;
//     acc.push({ jewelry: jewelryId });
//     return acc;
//   }, []);

//   let stoneTypesData = await JewelryStones.aggregate([

//         {
//           $lookup: {
//             as: "jewelries",
//             from: "jewelries",
//             foreignField: "_id",
//             localField: "jewelry",
//           },
//         },
//         {
//           $lookup: {
//             as: "stonetypes",
//             from: "stonetypes",
//             foreignField: "_id",
//             localField: "stoneType",
//           },
//         },
//         {
//           $match: {
//             $or: jewelryMatchCondition
//           },
//         },
//         {
//           $project: {
//             "stonetypes._id": 1,
//             "stonetypes.title": 1,
//           },
//         },
//         {
//           $group: {
//             _id: "$stonetypes._id",
//             title: {
//                 $first: "$stonetypes.title",
//               },
//             count: {
//               $count: {},
//             },
//           },
//         },

//   ]);

//   return stoneTypesData;
// };

const JewelryStones = require("../models/JewelryStones");

exports.getStoneTypesData = async (jewelryIds) => {
  let jewelryMatchCondition = jewelryIds.reduce((acc, curr) => {
    let jewelryId = curr;
    acc.push({ jewelry: jewelryId });
    return acc;
  }, []);

  let stoneTypesData = await JewelryStones.aggregate([
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
      $group: {
        _id: "$stoneType",
        jewelries: {
          $addToSet: "$jewelry",
        },
      },
    },
    {
      $lookup: {
        as: "stonetypes",
        from: "stonetypes",
        foreignField: "_id",
        localField: "_id",
      },
    },
    {
      $project: {
        stoneTypeId: "$_id",
        title: { $first: "$stonetypes.title" },
        count: {
          $size: "$jewelries",
        },
      },
    },
  ]);

  return stoneTypesData;
};
