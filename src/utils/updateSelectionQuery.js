exports.updateJewelryQuery = (selection, query) => {};

exports.updateSelectionQuery = (selection, query) => {
  const keys = Object.keys(selection);

  keys.forEach((key) => {
    const array = selection[key];

    if (key === "Metal") {
      query.push({
        $lookup: {
          as: "jewelrymetals",
          from: "jewelrymetals",
          foreignField: "jewelry",
          localField: "_id",
        },
      });

      if (!Array.isArray(array)) {
        query.push({
          $match: {
            "jewelrymetals.metal": Number(array),
          },
        });
      } else {
        let metalMatchCondition = array.reduce((acc, curr) => {
          let metalId = Number(curr);
          acc.push({ "jewelrymetals.metal": metalId });
          return acc;
        }, []);
        
        query.push({
          $match: {
            $or: metalMatchCondition,
          },
        });
      }
    } else if (key === "StoneType") {
      query.push({
        $lookup: {
          as: "jewelrystones",
          from: "jewelrystones",
          foreignField: "jewelry",
          localField: "_id",
        },
      });

      if (!Array.isArray(array)) {
        query.push({
          $match: {
            "jewelrystones.stoneType": Number(array),
          },
        });
      } else {
        let stoneTypeMatchCondition = array.reduce((acc, curr) => {
          let stoneTypeId = Number(curr);
          acc.push({ "jewelrystones.stoneType": stoneTypeId });
          return acc;
        }, []);
        query.push({
          $match: {
            $or: stoneTypeMatchCondition,
          },
        });
      }
    } else if (key === "StoneColor") {
      query.push({
        $lookup: {
          as: "jewelrystones",
          from: "jewelrystones",
          foreignField: "jewelry",
          localField: "_id",
        },
      });

      if (!Array.isArray(array)) {
        query.push({
          $match: {
            "jewelrystones.stoneColor": Number(array),
          },
        });
      } else {
        let stoneColorMatchCondition = array.reduce((acc, curr) => {
          let stoneColorId = Number(curr);
          acc.push({ "jewelrystones.stoneColor": stoneColorId });
          return acc;
        }, []);
        query.push({
          $match: {
            $or: stoneColorMatchCondition,
          },
        });
      }
    }
  });
  console.log(query);
};
