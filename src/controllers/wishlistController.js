const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleware");
const wishlistAuthUserManager = require("../managers/wishlistAuthUserManager");
const wishlistNotAuthUserManager = require("../managers/wishlistNotAuthUserManager");
const { getBagCount } = require("../middlewares/bagCounterMiddleware");
const { getLikeCount } = require("../middlewares/likeCounterMiddleware");
const Jewelry = require("../models/Jewelry");

router.get("/", getBagCount, getLikeCount, async (req, res) => {
  try {
    let userId;
    let jewelries;

    if (!req.user) {
      jewelries = await wishlistNotAuthUserManager.getAll(req);
    } else {
      userId = req.user._id;

      jewelries = await wishlistAuthUserManager.getAll(userId);
    }
    res.render("wishlist/wishlist", { jewelries });
  } catch (err) {
    console.log(err.message);
    res.render("500");
  }
});

router.post("/:jewelryId/create", async (req, res) => {
  try {
    const jewelryId = req.params.jewelryId;

    if (!req.user) {
      await wishlistNotAuthUserManager.create(req, jewelryId);
    } else {
      const userId = req.user._id;

      await wishlistAuthUserManager.create(userId, jewelryId);
    }
    const referer = req.get("referer");
    res.redirect(referer);
  } catch (err) {
    console.log(err.message);
    res.render("500");
  }
});

router.post("/:jewelryId/delete", async (req, res) => {
  try {
    const jewelryId = req.params.jewelryId;

    if (!req.user) {
      await wishlistNotAuthUserManager.delete(req, jewelryId);
    } else {
      const userId = req.user._id;
      await wishlistAuthUserManager.delete(userId, jewelryId);
    }

    // res.redirect(`/${jewelryId}/details`)

    const referer = req.get("referer");
    res.redirect(referer);
  } catch (err) {
    console.log(err.message);
    res.render("500");
  }
});

module.exports = router;
