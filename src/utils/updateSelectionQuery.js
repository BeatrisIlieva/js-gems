exports.updateSelectionQuery = (selection, query) => {
  const keys = Object.keys(selection);

  keys.forEach((key) => {
    const array = selection[key];
    let matchString;
    let lookupString;

    if (key === "Metal") {
      matchString = "jewelrymetals.metal";
      lookupString = "jewelrymetals";
    };
    // } else if (key === "StoneType") {
    //   const matchString = "jewelrystones.stoneType";
    //   const lookupString = "jewelrystones";
    // } else if (key === "StoneColor") {
    //   const matchString = "jewelrystones.stoneColor";
    //   const lookupString = "jewelrystones";
    // }

    query.push({
      $lookup: {
        as: lookupString,
        from: lookupString,
        foreignField: "jewelry",
        localField: "_id",
      },
    });
    if (!Array.isArray(array)) {
      const matchCondition = {};
      matchCondition[matchString] = Number(array);
      query.push({
        $match: matchCondition,
      });
    } else {
      const matchConditions = array.map((num) => {
        const condition = {};
        condition[matchString] = Number(num);
        return condition;
      });
      query.push({
        $match: {
          $or: matchConditions,
        },
      });
    }
  });

  return query;
};
