const ShoppingBag = require("../models/ShoppingBag");
const Size = require("../models/Size");
const { DEFAULT_MIN_QUANTITY } = require("../constants/shoppingBag");
const Jewelry = require("../models/Jewelry");
const { Decimal128 } = require("bson");

exports.getAll = async (userId) => {
  const result = await ShoppingBag.find({ userId });

  const bagItems = {};

  let subTotal = 0;

  for (let i = 0; i < result.length; i++) {
    const jewelryId = result[i].jewelryId.toString();
    const bagItemId = result[i]._id;
    
    const jewelry = await Jewelry.findById(jewelryId)
      .populate("category")
      .populate("metals.kind")
      .populate("metals.caratWeight")
      .populate("stones.kind")
      .populate("stones.color")
      .populate("stones.caratWeight")
      .lean();
    const sizeId = result[i].sizeId;
    const size = await Size.findById(sizeId).populate("measurement").lean();
    const quantity = result[i].quantity;
    const total = quantity * jewelry.price;
    const maxQuantity = jewelry.quantity + quantity;
    bagItems[bagItemId] = {
      bagItemId,
      jewelry: jewelry,
      size: size,
      quantity: quantity,
      total: total,
      maxQuantity: maxQuantity,
      minQuantity: DEFAULT_MIN_QUANTITY,
    };
    subTotal += total;
  }

  return {bagItems, subTotal};
};

exports.updateQuantity = async (bagItemId, updatedQuantity) => {
  const bagItem = await ShoppingBag.findById(bagItemId);

  const jewelryId = bagItem.jewelryId.toString();

  const jewelry = await Jewelry.findById(jewelryId);

  alreadyAddedQuantity = bagItem.quantity;

  availableQuantity = jewelry.quantity + alreadyAddedQuantity;

  if (updatedQuantity < DEFAULT_MIN_QUANTITY) {
    throw new Error("Quantity must be greater than zero");
  } else if (updatedQuantity > availableQuantity) {
    throw new Error(
      `Please choose quantity between ${DEFAULT_MIN_QUANTITY} and ${availableQuantity}`
    );
  } else {
    await bagItem.updateOne({ quantity: updatedQuantity });

    if (alreadyAddedQuantity < updatedQuantity) {
      difference = updatedQuantity - alreadyAddedQuantity;
      newQuantity = jewelry.quantity - difference;
    } else {
      difference = alreadyAddedQuantity - updatedQuantity;
      newQuantity = jewelry.quantity + difference;

      if (Number(updatedQuantity) === 0) {
        await bagItem.deleteOne();
      }
    }
    await jewelry.updateOne({ quantity: newQuantity });
  }
};
