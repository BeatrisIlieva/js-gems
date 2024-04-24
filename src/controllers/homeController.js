const router = require("express").Router();
const { getBagCount } = require("../middlewares/bagCounterMiddleware");
const { getLikeCount } = require("../middlewares/likeCounterMiddleware");
const homeManager = require("../managers/homeManager");
const jewelryManager = require("../managers/jewelryManager");
const {
  setJewelriesLikedNotAuthUser,
} = require("../utils/setIsLikedNotAuthUser");
const { setJewelriesLikedAuthUser } = require("../utils/setIsLikedAuthUser");

router.get("/", getBagCount, getLikeCount, async (req, res) => {
  try {
    res.render("index");
  } catch (err) {
    console.log(err.message);
    res.render("500");
  }
});

router.get("/search", getBagCount, getLikeCount, async (req, res) => {
  try {
    let limit = 6;
    let limitIncrement = 6;
    let loadMoreDisabled = false;
    let totalLength;

    let jewelries;

    if (req.query["loadMore"]) {
      let selectionQuery = [];

      limit = limit + limitIncrement;

      jewelries = await jewelryManager.getAll(
        jewelryIds,
        selectionQuery,
        limit
      );

      totalLength = jewelries.length;

      if (limit >= totalLength) {
        loadMoreDisabled = true;
      }
    } else {
      const search = req.query["search"][1];

      jewelries = await homeManager.getSearchResults(search, 1000);

      jewelryIds = jewelries.map((jewelry) => jewelry._id);
      req.session.searchedJewelries = req.session.searchedJewelries || [];
      req.session.searchedJewelries = jewelryIds;

      jewelries = await homeManager.getSearchResults(search, limit);
    }

    if (req.user) {
      const userId = req.user._id;

      jewelries = await setJewelriesLikedAuthUser(jewelries, userId);
    } else {
      jewelries = await setJewelriesLikedNotAuthUser(req, jewelries);
    }

    res.render("common/searchResults", { jewelries, loadMoreDisabled });
  } catch (err) {
    console.log(err.message);
    res.render("500");
  }
});

router.get("/404", (req, res) => {
  res.render("404");
});

module.exports = router;
