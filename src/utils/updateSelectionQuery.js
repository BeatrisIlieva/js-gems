exports.updateSelectionQuery = (selection) => {
  const keys = Object.keys(selection);

  let selectionQuery = [];

  keys.forEach((key) => {
    const array = selection[key];

    if (key === "Metal") {
      selectionQuery.push({
        $lookup: {
          as: "jewelrymetals",
          from: "jewelrymetals",
          foreignField: "jewelry",
          localField: "_id",
        },
      });

      if (!Array.isArray(array)) {
        selectionQuery.push({
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
        
        selectionQuery.push({
          $match: {
            $or: metalMatchCondition,
          },
        });
      }
    } else if (key === "StoneType") {
      selectionQuery.push({
        $lookup: {
          as: "jewelrystones",
          from: "jewelrystones",
          foreignField: "jewelry",
          localField: "_id",
        },
      });

      if (!Array.isArray(array)) {
        selectionQuery.push({
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
        selectionQuery.push({
          $match: {
            $or: stoneTypeMatchCondition,
          },
        });
      }
    } else if (key === "StoneColor") {
      selectionQuery.push({
        $lookup: {
          as: "jewelrystones",
          from: "jewelrystones",
          foreignField: "jewelry",
          localField: "_id",
        },
      });

      if (!Array.isArray(array)) {
        selectionQuery.push({
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
        selectionQuery.push({
          $match: {
            $or: stoneColorMatchCondition,
          },
        });
      }
    }
  });
  return selectionQuery;
};
