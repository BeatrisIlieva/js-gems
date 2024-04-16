const router = require("express").Router();
const {getBagCount} = require("../middlewares/bagCounterMiddleware");
// const {getLikesCount} = require("../utils/counterHelper");

router.get("/", getBagCount, async (req, res) => {
  // const userId = req.user?._id;
  try {
    res.render("index");
  } catch (err) {
    console.log(err.message)
    res.render("500");
  }
});

router.get("/404", (req, res) => {
  res.render("404");
});

module.exports = router;
