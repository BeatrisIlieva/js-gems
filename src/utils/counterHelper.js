
const Wishlist = require("../models/Wishlist");



exports.getLikesCount = async (userId) => {
  const items = await Wishlist.find({ user: userId }).lean();
  likesCount = items.length;
  
  return likesCount;
};
