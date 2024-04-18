const Wishlist = require("../models/Wishlist");
const Jewelry = require("../models/Jewelry");
const { setJewelriesLikedAuthUser } = require("../utils/setIsLikedAuthUser");
const {
  isSelectionEmpty,
  isArrayEmpty,
} = require("../utils/checkIfCollectionIsEmpty");

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

exports.getAll = async (userId) => {
  let jewelryIds = await Wishlist.find({ user: userId }).select("jewelry");
  jewelryIds = jewelryIds.map((item) => item.jewelry);

  let jewelries = await Jewelry.find({ _id: { $in: jewelryIds } }).lean();

  jewelries = await setJewelriesLikedAuthUser(jewelries, userId);

  return jewelries;
};
