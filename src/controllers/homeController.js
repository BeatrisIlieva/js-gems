const router = require("express").Router();
const { getBagCount } = require("../middlewares/bagCounterMiddleware");
const { getLikeCount } = require("../middlewares/likeCounterMiddleware");
const homeManager = require("../managers/homeManager");
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
    const search = req.query["search"][1];
    let jewelries = await homeManager.getSearchResults(search);

    if (req.user) {
      const userId = req.user._id;

      jewelries = await setJewelriesLikedAuthUser(jewelries, userId);
    } else {
      jewelries = await setJewelriesLikedNotAuthUser(req, jewelries);
    }

    res.render("common/searchResults", { jewelries });
  } catch (err) {
    console.log(err.message);
    res.render("500");
  }
});

router.get("/404", (req, res) => {
  res.render("404");
});

module.exports = router;
