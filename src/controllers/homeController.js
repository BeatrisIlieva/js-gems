const router = require("express").Router();
const {getBagCount} = require("../utils/counterHelper");
const {getLikesCount} = require("../utils/counterHelper");

router.get("/", async (req, res) => {
  const userId = req.user?._id;
  try {
    bagCount = await getBagCount(userId);
    likesCount = await getLikesCount(userId);
    res.render("index", { bagCount, likesCount });
  } catch (err) {
    console.log(err.message)
    res.render("500");
  }
});

router.get("/404", (req, res) => {
  res.render("404");
});

module.exports = router;
