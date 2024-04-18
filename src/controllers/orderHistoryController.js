const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleware");
const Order = require("../models/Order");
const { getBagCount } = require("../middlewares/bagCounterMiddleware");
const { getLikeCount } = require("../middlewares/likeCounterMiddleware");

router.get("/:userId", isAuth, getBagCount, getLikeCount, async (req, res) => {
    const userId = req.user._id;
    try {
        orderItems = await Order.find({user: userId}).lean();
        orderItems.forEach(element => {
            console.log(element.jewelries);
            console.log(element._id);
        });


        res.render("orders/ordersHistory", {orderItems});
      } catch (err) {
        console.log(err.message);
        res.render("500");
      }
})

module.exports = router;