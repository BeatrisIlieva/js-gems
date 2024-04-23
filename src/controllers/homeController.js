const router = require("express").Router();
const { getBagCount } = require("../middlewares/bagCounterMiddleware");
const { getLikeCount } = require("../middlewares/likeCounterMiddleware");
const homeManager = require("../managers/homeManager");

router.get("/", getBagCount, getLikeCount, async (req, res) => {
  try {
    res.render("index");
  } catch (err) {
    console.log(err.message);
    res.render("500");
  }
});

router.get("/search", async (req, res) => {
  try {
    const search = req.query["search"][1];
    const searchResult = await homeManager.getSearchResults(search);

    res.render("common/searchResults", { searchResult });
  } catch (err) {
    console.log(err.message);
    res.render("500");
  }
});

router.get("/404", (req, res) => {
  res.render("404");
});

module.exports = router;
