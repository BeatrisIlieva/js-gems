const Profile = require("../models/Profile");

exports.createProfile = async (userId) => {
  await Profile.create({
    user: userId,
  });
};

exports.findProfile = async (userId) => {
  const profile = await Profile.findOne({
    user: userId,
  }).lean();

  return profile;
};

exports.updateProfile = async (userId, profileData) => {
   await Profile.findOneAndUpdate(
    { user: userId },
    profileData,
    { runValidators: true, new: true }
  );
};
