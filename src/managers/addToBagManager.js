const ShoppingBag = require("../models/ShoppingBag");
const Size = require("../models/Size");
const Jewelry = require("../models/Jewelry");
const bagManager = require("../managers/bagManager");



exports.createOrUpdate = async ({
  user,
  jewelry,
  size,
  quantity: DEFAULT_ADD_QUANTITY,
}) => {
  const jewelry = await Jewelry.findById(jewelryId);
  oldJewelryQuantity = Number(jewelry.quantity);
  newJewelryQuantity = oldJewelryQuantity - DEFAULT_ADD_QUANTITY;
  await jewelry.updateOne({ quantity: newJewelryQuantity });

  let bagItem = await bagManager.findOne({user, jewelry, size});

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

  totalPrice = jewelry.price * Decimal128(updatedQuantity);
  await bagItem.updateOne({ quantity: updatedQuantity, totalPrice });

  payload.shoppingBag.push(bagItem);

  return bagItem;
};

exports.updateBagItemTotalPrice = (bagItemId) => {};
