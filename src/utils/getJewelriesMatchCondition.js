
const StoneType = require("../models/StoneType");
const StoneColor = require("../models/StoneColor");

const {aggregateByStoneType} = require("./aggregateByStoneType")
const {aggregateByStoneColor} = require("./aggregateByStoneColor")


exports.getJewelriesMatchCondition = async (jewelryIds, jewelriesMatchCondition) => {
  
  const stoneTypes = await StoneType.find().lean();
  const stoneColors = await StoneColor.find().lean();
  if (jewelryIds.length < 2) {
    let matchCondition = {};

    matchCondition["jewelries._id"] = Number(jewelryIds);

    jewelriesMatchCondition.push({
      $match: {
        "jewelries._id": jewelryIds[0],
      },
    });
  } else {
    let matchConditions = jewelryIds.map((jewelryId) => ({
      "jewelries._id": jewelryId,
    }));

    jewelriesMatchCondition.push({
      $match: {
        $or: matchConditions,
      },
    });
  }
  // metalsData = await aggregateByMetal(metals, categoryId, jewelriesMatchCondition);
  // let stoneTypesData = await aggregateByStoneType(stoneTypes, categoryId, jewelriesMatchCondition);
  // let stoneColorsData = await aggregateByStoneColor(stoneColors, categoryId, jewelriesMatchCondition);
  // console.log(metalsData);
  // console.log(jewelriesMatchCondition);

  return jewelriesMatchCondition;
  // return {metalsData, stoneTypesData, stoneColorsData};
};
