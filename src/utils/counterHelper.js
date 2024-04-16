const ShoppingBag = require("../models/ShoppingBag");
const Wishlist = require("../models/Wishlist");

exports.getBagCount = async (userId) => {
  const items = await ShoppingBag.find({ user: userId }).lean();
  bagCount = items.length;

  return bagCount;
};

exports.getLikesCount = async (userId) => {
  const items = await Wishlist.find({ user: userId }).lean();
  likesCount = items.length;
  
  return likesCount;
};
