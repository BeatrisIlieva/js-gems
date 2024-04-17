const router = require("express").Router();
const jewelryManager = require("../managers/jewelryManager");
const metalIds = ({
  yellowGoldId,
  roseGoldId,
  whiteGoldId,
  platinumId,
} = require("../constants/jewelryComposition"));
const { getBagCount } = require("../middlewares/bagCounterMiddleware");
const { getLikeCount } = require("../middlewares/likeCounterMiddleware");
const { isArrayEmpty } = require("../utils/checkIfCollectionIsEmpty");

router.get("/:categoryId", getBagCount, getLikeCount, async (req, res) => {
  try {
    let userId;

    const category = req.params.categoryId;
    const categoryId = Number(category);
    const selection = req.query;
    // let result;
    result = await jewelryManager.getAll({ categoryId, selection, userId })

    if (req.user) {
      userId = req.user._id;
      result = await jewelryManager.getAll({ categoryId, selection, userId });
    } else {
      const jewelryIds = req.session.wishlistItems;
      console.log(req.session.wishlistItems);

      result = await jewelryManager.getAll({
        categoryId,
        selection,
      });
      for (let i = 0; i < result.length; i++) {
        const item = result[i];
        itemId = item._id;
        let isLikedByUser = jewelryIds.includes(itemId);
    
        item["isLikedByUser"] = isLikedByUser;
      }
    }
    const { jewelries, metalsByCount, stoneTypesByCount, stoneColorsByCount } =
      result;
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
