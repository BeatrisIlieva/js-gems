const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleware");
const {
  DEFAULT_ADD_QUANTITY,
  DEFAULT_MIN_QUANTITY,
} = require("../constants/shoppingBag");
const { extractErrorMessages } = require("../utils/errorHelpers");
const displayBagManager = require("../managers/displayBagManager");
const {getBagCount} = require("../utils/bagCounterHelper");

router.get("/:userId", isAuth, async (req, res) => {
  try{
    const userId = req.params.userId;

    const {bagItems, subTotal} = await displayBagManager.getAll(userId);
    bagCount = await getBagCount(userId);

    const bagCountGreaterThanOne = bagCount > 1;
  
    res.render("bag/display", { bagItems, DEFAULT_MIN_QUANTITY, bagCount, bagCountGreaterThanOne, subTotal});
  } catch(err) {
    res.render('500');
  }
});

router.post("/:userId", isAuth, async (req, res) => {
    const userId = req.user._id;
    const jewelryId = req.params.jewelryId;
    const sizeId = req.params.sizeId;
    // const bagItemId = req.body.bagItemId;
  
    const { updatedQuantity, bagItemId } = req.body;
  
    try {
      await displayBagManager.updateQuantity(
        bagItemId,
        updatedQuantity
      );
    
      res.redirect(`/display-bag/${userId}`);
    } catch (err) {
        const errorMessages = extractErrorMessages(err);
  
        res.redirect(`/display-bag/${userId}`);
  
        // res.status(404).render("bag/display", jewelries, DEFAULT_MIN_QUANTITY, { errorMessages });
    }
  });
  
  module.exports = router;