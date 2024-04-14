const router = require("express").Router();
const jewelryManager = require("../managers/jewelryManager");
const {
  yellowGoldId,
  roseGoldId,
  whiteGoldId,
  platinumId,
} = require("../constants/jewelryComposition");

router.get("/:categoryId", async (req, res) => {
  try {
    const selection =req.query;

    const selectionAsInt = Number(Object.values(selection)[0]);
    const category = await req.params.categoryId;
    const categoryId = Number(category);
    const jewelries = await jewelryManager.getAll(categoryId, selectionAsInt);

    yellowGoldAggregation = await jewelryManager.getYellowGoldByCount(categoryId, yellowGoldId);
    console.log(yellowGoldAggregation);
    yellowGoldCount = yellowGoldAggregation[0].count;
    // stoneTypes = await jewelryManager.getStoneTypesByCount(categoryId);
    // stoneColors = await jewelryManager.getStoneColorsByCount(categoryId);
    context = {jewelries, categoryId, yellowGoldCount, yellowGoldId}
    res.render("jewelries/all", context);
  } catch (err) {
    console.log(err.message);
    res.render("500");
  }
});


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
