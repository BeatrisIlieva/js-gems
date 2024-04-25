const router = require("express").Router();
const profileManager = require("../managers/profileManager");
const { extractErrorMessages } = require("../utils/errorHelpers");
const { getBagCount } = require("../middlewares/bagCounterMiddleware");
const { getLikeCount } = require("../middlewares/likeCounterMiddleware");
const User = require("../models/User");

router.get("/edit", getBagCount, getLikeCount, async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    const email = user.email;
    const profile = await profileManager.findProfile(userId);

    res.render("profiles/edit", { profile, email });
  } catch (err) {
    res.render("500");
  }
});

router.post("/edit", async (req, res) => {
  const userId = req.user._id;

  const profileData = req.body;

  try {
    await profileManager.updateProfile(userId, profileData);
    res.redirect(`/profiles/edit`);
  } catch (err) {
    const errorMessages = extractErrorMessages(err);
    const profile = await profileManager.findProfile(userId);
    res.status(404).render("profiles/edit", { errorMessages, profile });
  }
});

module.exports = router;
