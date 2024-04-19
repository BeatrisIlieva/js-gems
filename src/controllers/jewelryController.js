const router = require("express").Router();
const jewelryManager = require("../managers/jewelryManager");
const { getBagCount } = require("../middlewares/bagCounterMiddleware");
const { getLikeCount } = require("../middlewares/likeCounterMiddleware");
const {
  setJewelriesLikedAuthUser,
  setJewelryLikedAuthUser,
} = require("../utils/setIsLikedAuthUser");
const {
  setJewelriesLikedNotAuthUser,
  setJewelryLikedNotAuthUser,
} = require("../utils/setIsLikedNotAuthUser");

router.get("/:categoryId", getBagCount, getLikeCount, async (req, res) => {
  try {
    const category = req.params.categoryId;
    const categoryId = Number(category);
    const selection = req.query;

    let { jewelries, metalsData, stoneTypesByCount, stoneColorsByCount } =
      await jewelryManager.getAll(categoryId, selection);

    if (req.user) {
      const userId = req.user._id;

      jewelries = await setJewelriesLikedAuthUser(jewelries, userId);
    } else {
      jewelries = await setJewelriesLikedNotAuthUser(req, jewelries);
    }

    res.render("jewelries/all", {
      jewelries,
      metalsData,
      stoneTypesByCount,
      stoneColorsByCount,
    });
  } catch (err) {
    console.log(err.message);
    res.render("500");
  }
});

router.get(
  "/:jewelryId/details",
  getBagCount,
  getLikeCount,
  async (req, res) => {
    const jewelryId = req.params.jewelryId;
    try {
      let jewelry = await jewelryManager.getOne(jewelryId);

      if (req.user) {
        const userId = req.user._id;

        jewelry = await setJewelryLikedAuthUser(jewelry, userId);
      } else {
        jewelry = await setJewelryLikedNotAuthUser(req, jewelry);
      }

      res.render("jewelries/jewelry-details", { jewelry });
    } catch (err) {
      console.log(err.message);
      res.render("500");
    }
  }
);

module.exports = router;
