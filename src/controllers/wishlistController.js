const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleware");
const wishlistAuthUserManager = require("../managers/wishlistAuthUserManager");
const { getBagCount } = require("../middlewares/bagCounterMiddleware");
const { getLikeCount } = require("../middlewares/likeCounterMiddleware");
const Jewelry = require("../models/Jewelry");

router.get("/", getBagCount, getLikeCount, async (req, res) => {
  try {
    let userId;
    let jewelries;

    if (!req.user) {
      const jewelryIds = Object.keys(req.session.wishlistItems).map(Number);
      let jewelries = await Jewelry.find({ _id: { $in: jewelryIds } }).lean();

      for (let i = 0; i < jewelries.length; i++) {
        const jewelry = jewelries[i];
        jewelryId = jewelry._id;
        let isLikedByUser = jewelryIds.includes(jewelryId);

        jewelry["isLikedByUser"] = isLikedByUser;
      }

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
      req.session.wishlistItems = req.session.wishlistItems || {};

        req.session.wishlistItems[jewelryId] = jewelryId;
        console.log(req.session.wishlistItems);
    } else {
      const userId = req.user._id;

      await wishlistAuthUserManager.create({ userId, jewelryId });
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
      delete req.session.wishlistItems[jewelryId];
    } else {
      const userId = req.user._id;

      await wishlistAuthUserManager.delete({ userId, jewelryId });
    }

    const referer = req.get("referer");
    res.redirect(referer);
  } catch (err) {
    console.log(err.message);
    res.render("500");
  }
});

module.exports = router;
