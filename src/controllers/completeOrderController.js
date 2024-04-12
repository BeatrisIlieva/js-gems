const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleware");
const { extractErrorMessages } = require("../utils/errorHelpers");
const profileManager = require("../managers/profileManager");

router.get("/", isAuth, async (req, res) => {
    const userId = req.user._id;

    try {
        const profile = await profileManager.findProfile(userId);

        if (profile) {
            res.render("orders/completeOrder", { profile });
        } else {
            res.render("orders/completeOrder");
        }

    } catch(err) {
        const errorMessages = extractErrorMessages(err);
  
        res.status(404).render("orders/completeOrder", { errorMessages });
    }
})

module.exports = router;