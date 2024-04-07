const router = require("express").Router();

const shoppingBagManager = require("../managers/shoppingBagManager");

router.get("/shopping-bag", (req, res) => {
  res.redirect("shopping-bag");
});

router.post("/:jewelryId", async (req, res) => {
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
