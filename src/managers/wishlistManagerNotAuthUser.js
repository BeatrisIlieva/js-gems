const Wishlist = require("../models/Wishlist");
const Jewelry = require("../models/Jewelry");
const { setJewelriesLikedNotAuthUser } = require("../utils/setJewelriesLiked");
const {
  isSelectionEmpty,
  isArrayEmpty,
} = require("../utils/checkIfCollectionIsEmpty");

exports.create = (jewelryId) => {
    res.locals.wishlistItems.push(jewelryId);
};

exports.delete = (jewelryId) => {
    res.locals.wishlistItems = res.locals.wishlistItems.filter(item => item !== jewelryId);
};

exports.getAll = async (jewelryIds) => {
  let jewelries = await Jewelry.find({ _id: { $in: jewelryIds } }).lean();

  jewelries = await setJewelriesLikedNotAuthUser(jewelries);

  return jewelries;
};
