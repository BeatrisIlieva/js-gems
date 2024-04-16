const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleware");
const bagManager = require("../managers/bagManager");
const { getBagCount } = require("../utils/counterHelper");
const {
  DEFAULT_ADD_QUANTITY,
  DEFAULT_MIN_QUANTITY,
} = require("../constants/shoppingBag");
const { extractErrorMessages } = require("../utils/errorHelpers");
const Jewelry = require("../models/Jewelry");
const jewelryManager = require("../managers/jewelryManager");

router.get("/", isAuth, async (req, res) => {
  try {
    const userId = req.user._id;

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

  const jewelryId = Number(req.params.jewelryId);

  try {
    const { size } = req.body;
    let bagItem;
    let sizeId;

    if (!size) {
      throw new Error("Ensure you have selected the desired size.");
    } else {
      sizeId = Number(size);
      bagItem = await bagManager.getOne({ userId, jewelryId, sizeId });
    };

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

    res.redirect(`/bag/`);
  } catch (err) {
    const errorMessages = extractErrorMessages(err);
    const jewelry = await jewelryManager.getOne(jewelryId);
    res.render("jewelries/jewelry-details", { errorMessages, jewelry });
  }
  //   payload.shoppingBag.push(bagItem);
});

router.post("/:jewelryId/update", isAuth, async (req, res) => {
  const userId = req.user._id;

  const { updatedQuantity, bagItemId, sizeId } = req.body;
  const sizeIdAsNumber = Number(sizeId);

  try {
    await bagManager.update({
      bagItemId,
      updatedQuantity,
      userId,
      sizeIdAsNumber,
    });

    res.redirect(`/bag/`);
  } catch (err) {
    const errorMessages = extractErrorMessages(err);

    res.render("/bag/", errorMessages);

    // res.status(404).render("bag/display", jewelries, DEFAULT_MIN_QUANTITY, { errorMessages });
  }
});

module.exports = router;
