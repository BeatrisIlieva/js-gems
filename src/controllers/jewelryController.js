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

    const userId = req.user._id;

    const { jewelries, metalsByCount, stoneTypesByCount, stoneColorsByCount } =
      await jewelryManager.getAll(categoryId, selection, userId);


    res.render("jewelries/all", {
      jewelries,
      metalsByCount,
      stoneTypesByCount,
      stoneColorsByCount,
    });
    
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

    res.render("jewelries/jewelry-details", { jewelry });
  } catch (err) {
    console.log(err.message);
    res.render("500");
  }
});



module.exports = router;
