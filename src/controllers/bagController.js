const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleware");
const { getBagCount } = require("../middlewares/bagCounterMiddleware");
const { getLikeCount } = require("../middlewares/likeCounterMiddleware");
const bagManager = require("../managers/bagManager");
const {
  DEFAULT_ADD_QUANTITY,
  DEFAULT_MIN_QUANTITY,
} = require("../constants/shoppingBag");
const { extractErrorMessages } = require("../utils/errorHelpers");
const jewelryManager = require("../managers/jewelryManager");
const shoppingBag = require("../models/ShoppingBag");

router.get("/", isAuth, getBagCount, getLikeCount, async (req, res) => {
  try {
    const userId = req.user._id;

    const bagCount = res.locals.bagCount;
    const bagCountGreaterThanOne = bagCount > 1;
    const isEmpty = bagCount === 0;

    let jewelries = await bagManager.getAll(userId);

    if (!isEmpty) {
      res.render("bag/display", {
        jewelries,
        DEFAULT_MIN_QUANTITY,
        bagCountGreaterThanOne,
        bagCount,
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
    }

    if (!bagItem) {
      await bagManager.create({
        userId,
        jewelryId,
        sizeId,
        quantity: DEFAULT_ADD_QUANTITY,
      });
    } else {
      newQuantity = Number(bagItem.quantity) + DEFAULT_ADD_QUANTITY;
      await shoppingBag.findOneAndUpdate(
        { user: userId, jewelry: jewelryId, size: sizeId },
        { quantity: newQuantity }
      );
    }

    res.redirect("/bag");
  } catch (err) {
    const errorMessages = extractErrorMessages(err);
    const jewelry = await jewelryManager.getOne(jewelryId);
    res.render("jewelries/jewelry-details", { errorMessages, jewelry });
  }
});

router.post("/:jewelryId/update", isAuth, async (req, res) => {
  const userId = req.user._id;

  let { updatedQuantity, bagItemId, sizeId } = req.body;
  sizeId = Number(sizeId);

  try {
    await bagManager.update({
      bagItemId,
      updatedQuantity,
      userId,
      sizeId,
    });

    res.redirect("/bag");
  } catch (err) {
    const errorMessages = extractErrorMessages(err);

    res.redirect("/bag", { errorMessages });
  }
});

module.exports = router;
