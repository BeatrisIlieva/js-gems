const ShoppingBag = require("../models/ShoppingBag");
const Size = require("../models/Size");
const Jewelry = require("../models/Jewelry");

exports.createOrUpdate = async ({
  userId,
  jewelryId,
  sizeId: size,
  quantity: DEFAULT_ADD_QUANTITY,
}) => {
  const jewelry = await Jewelry.findById(jewelryId);
  oldJewelryQuantity = Number(jewelry.quantity);
  newJewelryQuantity = oldJewelryQuantity - DEFAULT_ADD_QUANTITY;
  await jewelry.updateOne({ quantity: newJewelryQuantity });

  let bagItem = await ShoppingBag.findOne({
    userId: userId,
    jewelryId: jewelryId,
    sizeId: size,
  });

  if (!bagItem) {
    bagItem = await ShoppingBag.create({
      userId,
      jewelryId,
      sizeId: size,
      quantity: DEFAULT_ADD_QUANTITY,
    });
  } else {
    newQuantity = Number(bagItem.quantity) + DEFAULT_ADD_QUANTITY;
    await bagItem.updateOne({ quantity: newQuantity });
  }

  return bagItem;
};

