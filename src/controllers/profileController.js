const router = require("express").Router();
const profileManager = require("../managers/profileManager");
const { extractErrorMessages } = require("../utils/errorHelpers");
const { getBagCount } = require("../middlewares/bagCounterMiddleware");
const { getLikeCount } = require("../middlewares/likeCounterMiddleware");

router.get("/edit", getBagCount, getLikeCount, async (req, res) => {
  const userId = req.user._id;

  try {
    const profile = await profileManager.findProfile(userId);

    res.render("profiles/edit", { profile });
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
