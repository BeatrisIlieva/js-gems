const Wishlist = require("../models/Wishlist");

exports.create = async ({ userId, jewelryId }) => {
  wishlist = await Wishlist.create({
    user: userId,
    jewelry: jewelryId,
  });
};

exports.delete = async ({ userId, jewelryId }) => {
  wishlistItem = await Wishlist.findOneAndDelete({
    user: userId,
    jewelry: jewelryId,
  });
};

exports.isLikedByUser = async ({ userId, jewelryId }) => {
  const isLikedByUser = await Wishlist.findOne({
    user: userId,
    jewelry: jewelryId,
  }).lean();
  return isLikedByUser;
};

exports.getAll = async (userId) => {
  const jewelries = await Wishlist.find({ user: userId })
    .populate("jewelry")
    .lean();
  return jewelries;
};
