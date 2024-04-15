const router = require("express").Router();
const jewelryManager = require("../managers/jewelryManager");
const metalIds = ({
  yellowGoldId,
  roseGoldId,
  whiteGoldId,
  platinumId,
} = require("../constants/jewelryComposition"));

router.get("/:categoryId", async (req, res) => {
  try {
    const category = req.params.categoryId;
    const categoryId = Number(category);
    const selection = req.query;
    const {jewelries, metalsByCount, stoneTypesByCount} = await jewelryManager.getAll(categoryId, selection);
    console.log(metalsByCount);
    console.log(stoneTypesByCount);

    res.render("jewelries/all", {jewelries, metalsByCount, stoneTypesByCount});
  } catch (err) {
    console.log(err.message);
    res.render("500");
  }
});
//   try {
//     const selection = req.query;
//     console.log(selection);
//     const selectionValuesAsInt = Object.values(selection).map((value) =>
//       Number(value)
//     );

//     // const selectionAsInt = Number(Object.values(selection)[0]);
//     // const selectionValues = Object.values(selection[0]).map(Number);
//     // console.log(selectionValues);
//     const category = req.params.categoryId;
//     const categoryId = Number(category);
//     const jewelries = await jewelryManager.getAll(
//       categoryId,
//       selectionValuesAsInt
//     );

//     // const metalsCount = {};

//     // metalIds.map(async (metalId) => {
//     //   const metalAggregation = await jewelryManager.getMetalsByCount(categoryId, metalId);
//     // }

//     // metalIds.forEach(metalId => {
//     //   jewelryManager.getMetalsByCount(
//     //     categoryId,
//     //     metalId
//     //   );
//     // });
//     let yellowGoldCount;
//     let roseGoldCount;
//     try {
//       const yellowGoldAggregation = await jewelryManager.getMetalsByCount(
//         categoryId,
//         yellowGoldId
//       );
//       if (yellowGoldAggregation.length > 0) {
//         yellowGoldCount = yellowGoldAggregation[0].count;
//       }
//     } catch (err) {
//       console.log(err.message);
//     }

//     try {
//       const roseGoldAggregation = await jewelryManager.getMetalsByCount(
//         categoryId,
//         roseGoldId
//       );
//       if (roseGoldAggregation.length > 0) {
//         roseGoldCount = roseGoldAggregation[0].count;
//       }
//     } catch (err) {
//       console.log(err.message);
//     }

//     // stoneTypesAggregation = await jewelryManager.getStoneTypesByCount(categoryId);
//     // stoneTypesCount = stoneTypesAggregation[0].count;
//     // stoneColors = await jewelryManager.getStoneColorsByCount(categoryId);
//     context = {
//       jewelries,
//       categoryId,
//       yellowGoldCount,
//       yellowGoldId,
//       roseGoldCount,
//       roseGoldId,
//     };
//     res.render("jewelries/all", context);
//   } catch (err) {
//     console.log(err.message);
//     res.render("500");
//   }
// });

router.get("/:jewelryId/details", async (req, res) => {
  const jewelryId = req.params.jewelryId;
  try {
    const jewelry = await jewelryManager.getOne(jewelryId);

    if (!jewelry) {
      return res.redirect("/404");
    }

    res.render("jewelries/details", { jewelry });
  } catch (err) {
    console.log(err.message);
    res.render("500");
  }
});

module.exports = router;
