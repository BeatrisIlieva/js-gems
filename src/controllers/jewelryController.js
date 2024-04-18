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
const {
  setJewelriesLiked,
  setJewelryLiked,
} = require("../utils/setJewelriesLiked");

router.get("/:categoryId", getBagCount, getLikeCount, async (req, res) => {
  try {
    const category = req.params.categoryId;
    const categoryId = Number(category);
    const selection = req.query;

    let { jewelries, metalsByCount, stoneTypesByCount, stoneColorsByCount } =
      await jewelryManager.getAll({ categoryId, selection });

    if (req.user) {
      const userId = req.user._id;
      jewelries = await setJewelriesLiked(jewelries, userId);
    } else {
      jewelries = await setJewelriesLikedNotAuthUser(req, jewelries);
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
        jewelry = await setJewelryLiked(jewelry, userId);
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

const setJewelriesLikedNotAuthUser = async (req, jewelries) => {
  const jewelryIds = Object.keys(req.session.wishlistItems || {}).map(Number);

  for (let i = 0; i < jewelries.length; i++) {
    const jewelry = jewelries[i];
    jewelryId = jewelry._id;
    let isLikedByUser = jewelryIds.includes(jewelryId);

    jewelry["isLikedByUser"] = isLikedByUser;
  }
  return jewelries;
};

const setJewelryLikedNotAuthUser = async (req, jewelry) => {
  const jewelryIds = Object.keys(req.session.wishlistItems || {}).map(Number);

  jewelryId = jewelry._id;
  let isLikedByUser = jewelryIds.includes(jewelryId);

  jewelry["isLikedByUser"] = isLikedByUser;

  return jewelry;
};

module.exports = router;
