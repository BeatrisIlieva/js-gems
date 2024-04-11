const User = require("../models/User");
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

exports.updateProfile = async (
  userId,
  firstName,
  lastName,
  phoneNumber,
  country,
  city,
  address
) => {
  
  const profileData = {
    firstName,
    lastName,
    phoneNumber,
    country,
    city,
    address,
  };
  const profile = await Profile.findOneAndUpdate({user: userId}, profileData).lean();

  return profile;
};
