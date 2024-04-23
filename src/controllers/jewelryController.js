const router = require("express").Router();
const { getMetalsData } = require("../utils/getMetalsData");
const { getStoneTypesData } = require("../utils/getStoneTypesData");
const { getStoneColorsData } = require("../utils/getStoneColorsData");
const jewelryManager = require("../managers/jewelryManager");
const { getBagCount } = require("../middlewares/bagCounterMiddleware");
const { getLikeCount } = require("../middlewares/likeCounterMiddleware");
const {
  setJewelriesLikedAuthUser,
  setJewelryLikedAuthUser,
} = require("../utils/setIsLikedAuthUser");
const {
  setJewelryLikedNotAuthUser,
  setJewelriesLikedNotAuthUser,
} = require("../utils/setIsLikedNotAuthUser");
const { isSelectionEmpty } = require("../utils/checkIfCollectionIsEmpty");

router.get("/:categoryId", getBagCount, getLikeCount, async (req, res) => {
  try {
    const category = req.params.categoryId;
    const categoryId = Number(category);
    const selection = req.query;

    let jewelries;
    let jewelryIds;

    if (!isSelectionEmpty(selection)) {
      jewelryIds = req.session.jewelryIds;
      jewelries = await jewelryManager.getFiltered(jewelryIds, selection);
    } else {
      jewelries = await jewelryManager.getAll(categoryId);
    }

    jewelryIds = jewelries.map((jewelry) => jewelry._id);
    req.session.jewelryIds = req.session.jewelryIds || [];
    req.session.jewelryIds = jewelryIds;

    let metalsData = await getMetalsData(jewelryIds);
    let stoneTypesData = await getStoneTypesData(jewelryIds);
    let stoneColorsData = await getStoneColorsData(jewelryIds);

    if (req.user) {
      const userId = req.user._id;

      jewelries = await setJewelriesLikedAuthUser(jewelries, userId);
    } else {
      jewelries = await setJewelriesLikedNotAuthUser(req, jewelries);
    }

    res.render("jewelries/all", {
      jewelries,
      metalsData,
      stoneTypesData,
      stoneColorsData,
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
      let jewelry = await jewelryManager.getOne(Number(jewelryId));

      if (req.user) {
        const userId = req.user._id;

        jewelry = await setJewelryLikedAuthUser(jewelry, userId);
      } else {
        jewelry = await setJewelryLikedNotAuthUser(req, jewelry);
      }

      req.session.lastViewedJewelries = req.session.lastViewedJewelries || [];

      let lastViewedJewelries;

      const idToCheck = Number(jewelryId);

      const exists = req.session.lastViewedJewelries.some((innerArray) =>
        innerArray.some((obj) => obj._id === idToCheck)
      );

      if (!exists) {
        if (req.session.lastViewedJewelries.length === 3) {
          req.session.lastViewedJewelries.splice(0, 1);
        }

        req.session.lastViewedJewelries.push(jewelry);
      }

      lastViewedJewelries = req.session.lastViewedJewelries.flat();

      res.render("jewelries/jewelry-details", { jewelry, lastViewedJewelries });
    } catch (err) {
      console.log(err.message);
      res.render("500");
    }
  }
);

module.exports = router;
