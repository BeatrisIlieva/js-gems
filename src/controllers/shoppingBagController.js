const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleware");
const {
  DEFAULT_ADD_QUANTITY,
  DEFAULT_MIN_QUANTITY,
} = require("../constants/shoppingBag");

const shoppingBagManager = require("../managers/shoppingBagManager");

router.get("/:userId", isAuth, async (req, res) => {
  const userId = req.params.userId;

  const jewelries = await shoppingBagManager.getAll(userId);

  res.render("bag/display", { jewelries, DEFAULT_MIN_QUANTITY });
});

router.post("/:jewelryId", isAuth, async (req, res) => {
  const userId = req.user._id;

  const jewelryId = req.params.jewelryId;

  const { size } = req.body;

  await shoppingBagManager.createOrUpdate({
    userId,
    jewelryId,
    sizeId: size,
    quantity: DEFAULT_ADD_QUANTITY,
  });

  res.redirect(`/shopping-bag/${userId}`);
});

router.post("/:jewelryId/:sizeId/update", isAuth, async (req, res) => {
  const userId = req.user._id;
  const jewelryId = req.params.jewelryId;
  const sizeId = req.params.sizeId;

  const { updatedQuantity } = req.body;

  await shoppingBagManager.updateQuantity(
    userId,
    jewelryId,
    sizeId,
    updatedQuantity
  );

  res.redirect(`/shopping-bag/${userId}`);
});

module.exports = router;
