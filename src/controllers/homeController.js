const router = require("express").Router();
const ShoppingBag = require("../models/ShoppingBag");

router.get("/", async (req, res) => {
  const userId = req.user?._id;
  try {
    const items = await ShoppingBag.find({ userId }).lean();

    bagCount = items.length;
    res.render("index", { bagCount });
  } catch (err) {
    res.render("500");
  }
});

router.get("/404", (req, res) => {
  res.render("404");
});

module.exports = router;
