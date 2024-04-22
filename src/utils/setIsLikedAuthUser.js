const Wishlist = require("../models/Wishlist");

exports.setJewelriesLikedAuthUser = async (jewelries, userId) => {
  for (let i = 0; i < jewelries.length; i++) {
    const jewelry = jewelries[i];
    jewelryId = jewelry._id;
    let isLikedByUser = await isLiked(userId, jewelryId);
    isLikedByUser = !!isLikedByUser;
    jewelry["isLikedByUser"] = isLikedByUser;
  }

  return jewelries;
};

exports.setJewelryLikedAuthUser = async (jewelry, userId) => {
  jewelryId = jewelry[0]._id;
  console.log(userId);
  console.log(jewelryId);
  let isLikedByUser = await isLiked(userId, jewelryId);
  isLikedByUser = !!isLikedByUser;

  firstObj = jewelry;
  secondObj = { isLikedByUser: isLikedByUser };

  jewelry = firstObj.map((obj) => ({ ...obj, ...secondObj }));

  return jewelry;
};

const isLiked = async (userId, jewelryId) => {
  const isLikedByUser = await Wishlist.findOne({
    user: userId,
    jewelry: jewelryId,
  }).lean();

  return isLikedByUser;
};
