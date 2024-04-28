const router = require("express").Router();
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

router.get("/", getBagCount, getLikeCount, async (req, res) => {
  const bagCount = res.locals.bagCount;
  const bagCountGreaterThanOne = bagCount > 1;
  const isEmpty = bagCount === 0;
  let jewelries;
  let userId;
  let sessionId;

  try {
    if (req.user) {
      userId = req.user._id;
    } else {
      sessionId = req.session.id;
    }

    const errorMessages = req.session.errorMessages;
    delete req.session.errorMessages;

    if (!isEmpty) {
      jewelries = await bagManager.getAll(userId, sessionId);

      lastViewedJewelries = req.session.lastViewedJewelries.flat() || [];

      res.render("bag/display", {
        jewelries,
        DEFAULT_MIN_QUANTITY,
        bagCountGreaterThanOne,
        bagCount,
        errorMessages,
        lastViewedJewelries
      });
    } else {
      res.render("bag/display");
    }
  } catch (err) {
    console.log(err.messages);
    res.render("500");
  }
});

router.post("/:jewelryId/create", async (req, res) => {
  let userId;
  let sessionId;

  const jewelryId = Number(req.params.jewelryId);

  if (req.user) {
    userId = req.user._id;
  } else {
    sessionId = req.session.id;
  }

  try {
    const { size } = req.body;
    let bagItem;
    let sizeId;

    if (!size) {
      throw new Error("Ensure you have selected the desired size.");
    } else {
      sizeId = Number(size);
      bagItem = await bagManager.getOne({
        userId,
        sessionId,
        jewelryId,
        sizeId,
      });
    }

    if (!bagItem) {
      await bagManager.create({
        userId,
        sessionId,
        jewelryId,
        sizeId,
        quantity: DEFAULT_ADD_QUANTITY,
      });
    } else {
      newQuantity = Number(bagItem.quantity) + DEFAULT_ADD_QUANTITY;
      await shoppingBag.findOneAndUpdate(
        {
          $or: [{ user: userId }, { session: sessionId }],
          jewelry: jewelryId,
          size: sizeId,
        },
        { quantity: newQuantity }
      );
    }

    res.redirect("/bag");
  } catch (err) {
    const errorMessages = extractErrorMessages(err);
    const jewelry = await jewelryManager.getOne(jewelryId);
    res.render("jewelries/jewelryDetails", { errorMessages, jewelry });
  }
});

router.post("/:jewelryId/update", async (req, res) => {
  let { updatedQuantity, bagItemId, sizeId } = req.body;
  sizeId = Number(sizeId);

  try {
    await bagManager.update(bagItemId, updatedQuantity, sizeId);

    res.redirect("/bag");
  } catch (err) {
    const errorMessages = extractErrorMessages(err);
    req.session.errorMessages = errorMessages; // Store error messages in session
    res.redirect("/bag");
    // const errorMessages = extractErrorMessages(err);

    // const queryParams = new URLSearchParams({
    //   errorMessages: JSON.stringify(errorMessages),
    // });
    // res.redirect(`/bag?${queryParams.toString()}`);
  }
});

module.exports = router;
