const Wishlist = require("../models/Wishlist");

exports.setJewelriesLiked = async (jewelries, userId) => {
  for (let i = 0; i < jewelries.length; i++) {
    const jewelry = jewelries[i];
    jewelryId = jewelry._id;
    let isLikedByUser = await isLiked({
      userId,
      jewelryId,
    });
    isLikedByUser = !!isLikedByUser;
    jewelry["isLikedByUser"] = isLikedByUser;
  }
  return jewelries;
};

const isLiked = async ({ userId, jewelryId }) => {
  const isLikedByUser = await Wishlist.findOne({
    user: userId,
    jewelry: jewelryId,
  }).lean();
  return isLikedByUser;
};
