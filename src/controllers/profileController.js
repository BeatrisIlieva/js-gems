const router = require("express").Router();
const profileManager = require("../managers/profileManager");
const { extractErrorMessages } = require("../utils/errorHelpers");
const User = require("../models/User");
const Profile = require("../models/Profile");

router.get("/:userId/edit", async (req, res) => {
    const userId = req.user._id;

    const profile = await profileManager.findProfile(userId);

    res.render("profiles/edit", {profile});

  });

router.post("/:userId/edit", async (req, res) =>{
    const userId = req.user._id;

    const {firstName, lastName, phoneNumber, country, city, address} = req.body;

    const profile = await profileManager.updateProfile(userId, firstName, lastName, phoneNumber, country, city, address);

    res.render("profiles/edit", {profile})
});

module.exports = router;