const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleware");
const bagManager = require("../managers/bagManager");
const { getBagCount } = require("../managers/bagManager");
const {
  DEFAULT_ADD_QUANTITY,
  DEFAULT_MIN_QUANTITY,
} = require("../constants/shoppingBag");
const { extractErrorMessages } = require("../utils/errorHelpers");
const Jewelry = require("../models/Jewelry");

router.get("/:userId", isAuth, async (req, res) => {
  try {
    const userId = req.params.userId;

    let bagCount = 0;
    let bagCountGreaterThanOne = false;

    const { bagItems, subTotal } = await bagManager.getAll(userId);

    const isEmpty = Object.keys(bagItems).length === 0;

    if (!isEmpty) {
      bagCount = await getBagCount(userId);
      if (bagCount > 1) {
        bagCountGreaterThanOne = true;
      }
      res.render("bag/display", {
        bagItems,
        DEFAULT_MIN_QUANTITY,
        bagCount,
        bagCountGreaterThanOne,
        subTotal,
      });
    } else {
      res.render("bag/display");
    }
  } catch (err) {
    console.log(err.message);
    res.render("500");
  }
});

router.post("/:jewelryId/create", isAuth, async (req, res) => {
  const userId = req.user._id;

  const jewelryId = req.params.jewelryId;

  const { size } = req.body;

  const sizeId = size;

  try {
    const bagItem = await bagManager.getOne({ userId, jewelryId, sizeId });

    if (!bagItem) {
      await bagManager.create({
        userId,
        jewelryId,
        sizeId,
        quantity: DEFAULT_ADD_QUANTITY,
      });
    } else {
      newQuantity = Number(bagItem.quantity) + DEFAULT_ADD_QUANTITY;
      await bagItem.update({ quantity: newQuantity });
    }

    res.redirect(`/bag/${userId}`);
  } catch (err) {
    console.log(err.message);
    res.render("500");
  }
//   payload.shoppingBag.push(bagItem);
});

router.post("/:jewelryId/update", isAuth, async (req, res) => {
  const userId = req.user._id;

  const { updatedQuantity, bagItemId, sizeId } = req.body;

  try {
    await bagManager.update({ bagItemId, updatedQuantity, userId, sizeId });

    res.redirect(`/bag/${userId}`);
  } catch (err) {
    const errorMessages = extractErrorMessages(err);

    res.redirect(`/bag/${userId}`);

    // res.status(404).render("bag/display", jewelries, DEFAULT_MIN_QUANTITY, { errorMessages });
  }
});

module.exports = router;
