const router = require("express").Router();
const {getBagCount} = require("../utils/bagCounterHelper");

router.get("/", async (req, res) => {
  const userId = req.user?._id;
  try {
    bagCount = await getBagCount(userId);
    res.render("index", { bagCount });
  } catch (err) {
    res.render("500");
  }
});

router.get("/404", (req, res) => {
  res.render("404");
});

module.exports = router;
