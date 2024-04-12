const ShoppingBag = require("../models/ShoppingBag");

exports.getBagCount = async (userId) => {
  const items = await ShoppingBag.find({ userId }).lean();

  bagCount = items.length;
  return bagCount;
};
