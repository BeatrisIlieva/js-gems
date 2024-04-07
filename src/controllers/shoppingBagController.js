const router = require("express").Router();
const {isAuth} = require("../middlewares/authMiddleware");

const shoppingBagManager = require("../managers/shoppingBagManager");

router.get("/:userId", isAuth, async (req, res) => {
  const userId = req.params.userId;
  const jewelries = await shoppingBagManager.getAll(userId);
  console.log(jewelries.slice());
  res.render("bag/display", {jewelries});
});

router.post("/:jewelryId", isAuth, async (req, res) => {
  const userId = req.user._id;
  console.log(userId);
  const jewelryId = req.params.jewelryId;
  console.log(jewelryId);

  await shoppingBagManager.create({
    userId,
    jewelryId,
  });

  res.redirect("shopping-bag/:userId");
});

module.exports = router;
