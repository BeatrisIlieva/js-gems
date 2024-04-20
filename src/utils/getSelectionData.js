const Metal = require("../models/Metal");
StoneType = require("../models/StoneType");
StoneColor = require("../models/StoneColor");
const {aggregateByMetal} = require("../utils/aggregateByMetal");
const {aggregateByStoneType} = require("../utils/aggregateByStoneType")


exports.getSelectionData = async (categoryId, jewelryIds) => {
  const metals = await Metal.find().lean();
  const stoneTypes = await StoneType.find().lean();
  const stoneColors = await StoneColor.find().lean();

  const jewelriesMatchCondition = [];

  if (jewelryIds.length < 2) {
    const matchCondition = {};

    matchCondition["jewelries._id"] = Number(jewelryIds);

    jewelriesMatchCondition.push({
      $match: {
        "jewelries._id": jewelryIds[0],
      },
    });
  } else {
    const matchConditions = jewelryIds.map((jewelryId) => ({
      "jewelries._id": jewelryId,
    }));

    jewelriesMatchCondition.push({
      $match: {
        $or: matchConditions,
      },
    });
  }
  const metalsData = await aggregateByMetal(metals, categoryId, jewelriesMatchCondition);
  const stoneTypesData = await aggregateByStoneType(stoneTypes, categoryId, jewelriesMatchCondition);
  return {metalsData, stoneTypesData};
};
