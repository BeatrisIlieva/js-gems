const router = require("express").Router();
const {isAuth} = require("../middlewares/authMiddleware");
const {DEFAULT_ADD_QUANTITY, DEFAULT_MIN_QUANTITY} = require("../constants/shoppingBag");

const shoppingBagManager = require("../managers/shoppingBagManager");
const ShoppingBag = require("../models/ShoppingBag");
const Jewelry = require("../models/Jewelry");

router.get("/:userId", isAuth, async (req, res) => {
  const userId = req.params.userId;
  
  const jewelries = await shoppingBagManager.getAll(userId);

  res.render("bag/display", {jewelries, DEFAULT_MIN_QUANTITY});
});

router.post("/:jewelryId", isAuth, async (req, res) => {
  const userId = req.user._id;

  const jewelryId = req.params.jewelryId;

  const {size} = req.body;

  const jewelry = await Jewelry.findById(jewelryId);
  oldJewelryQuantity = Number(jewelry.quantity);
  newJewelryQuantity = oldJewelryQuantity - DEFAULT_ADD_QUANTITY;
  await jewelry.updateOne({quantity: newJewelryQuantity});

  const bagItem = await ShoppingBag.findOne({ userId: userId, jewelryId: jewelryId, sizeId: size });
  
  if (!bagItem) {
    await shoppingBagManager.create({
      userId,
      jewelryId,
      sizeId: size,
      quantity: DEFAULT_ADD_QUANTITY,
    });
  } else {
    newQuantity = Number(bagItem.quantity) + DEFAULT_ADD_QUANTITY;
    await bagItem.updateOne({quantity: newQuantity});
  }

  res.redirect(`/shopping-bag/${userId}`);
});

module.exports = router;
