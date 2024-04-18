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


    const category = req.params.categoryId;
    const categoryId = Number(category);
    const selection = req.query;

    const { jewelries, metalsByCount, stoneTypesByCount, stoneColorsByCount } =
    await jewelryManager.getAll({ categoryId, selection});

    if (req.user) {
      const userId = req.user._id;
      result = await jewelryManager.getAll({ categoryId, selection});
    } else {
      const jewelryIds = Object.keys(req.session.wishlistItems).map(Number);
      console.log(jewelryIds);

      
      for (let i = 0; i < jewelries.length; i++) {
        const jewelry = jewelries[i];
        jewelryId = jewelry._id;
        let isLikedByUser = jewelryIds.includes(jewelryId);
    
        jewelry["isLikedByUser"] = isLikedByUser;
      }
    }

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
