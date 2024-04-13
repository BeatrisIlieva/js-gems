const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleware");

router.get("/orders-history", isAuth, async (req, res) => {
    const userId = req.user._id;
    try {
        bagCount = await getBagCount(userId);
        res.render("index", { bagCount });
      } catch (err) {
        res.render("500");
      }
})

module.exports = router;