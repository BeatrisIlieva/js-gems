const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleware");
const orderConfirmationManager = require("../managers/orderConfirmationManager");
const profileManager = require("../managers/profileManager");


router.get("/", isAuth, async (req, res) => {
    const userId = req.user._id;

    try {

        const order = await orderConfirmationManager.getOne(userId);

        const profile = await profileManager.findProfile(userId);
        const fullName = `${profile.firstName} ${profile.lastName}`;
        res.render("orders/orderConfirmation", {order, profile, fullName});

    } catch(err) {
        console.log(err.message);
        res.render("500");
    }
})

module.exports = router;