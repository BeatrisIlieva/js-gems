const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleware");
const { extractErrorMessages } = require("../utils/errorHelpers");
const completeTransactionManager = require("../managers/completeTransactionManager");
const bagManager = require("../managers/bagManager");
const Order = require("../models/Order");
const orderConfirmationManager = require("../managers/orderConfirmationManager");
const {getBagCount} = require("../middlewares/bagCounterMiddleware");
const {getLikeCount} = require("../middlewares/likeCounterMiddleware");

router.get("/", isAuth, getBagCount, getLikeCount, async (req, res) => {
    try {
        res.render("orders/completeTransaction");

    } catch(err) {
        const errorMessages = extractErrorMessages(err);
  
        res.status(404).render("orders/completeTransaction", { errorMessages });
    }
});

router.post("/", isAuth, async(req, res) => {
    const userId = req.user._id;

    cardData = req.body;

    try {
        await completeTransactionManager.verifyCardDetails(cardData);
        
        await orderConfirmationManager.create(userId);

        

        res.redirect("/order-confirmation");

    } catch(err) {
        const errorMessages = extractErrorMessages(err);
  
        res.status(404).render("orders/completeTransaction", { errorMessages});
    }
});

module.exports = router;