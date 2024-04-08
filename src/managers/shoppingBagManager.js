const ShoppingBag = require("../models/ShoppingBag");
const Earring = require("../models/Jewelry");
const Size = require("../models/Size");
const { DEFAULT_MIN_QUANTITY } = require("../constants/shoppingBag");
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

exports.getAll = async (userId) => {
  const result = await ShoppingBag.find({ userId });

  const jewelries = {};
  for (let i = 0; i < result.length; i++) {
    const jewelryId = result[i].jewelryId.toString();
    const jewelry = await Earring.findById(jewelryId)
      .populate("category")
      .populate("metals")
      .populate("stones.kind")
      .populate("stones.color")
      .populate("stones.caratWeight")
      .lean();
    const sizeId = result[i].sizeId;
    const size = await Size.findById(sizeId).populate("measurement").lean();
    const quantity = result[i].quantity;
    const maxQuantity = jewelry.quantity + quantity;
    jewelries[`${i}`] = {
      jewelry: jewelry,
      size: size,
      quantity: quantity,
      maxQuantity: maxQuantity,
      minQuantity: DEFAULT_MIN_QUANTITY,
    };
  }

  return jewelries;
};

exports.updateQuantity = async (userId, jewelryId, sizeId, updatedQuantity) => {
  const bagItem = await ShoppingBag.findOne({
    userId: userId,
    jewelryId: jewelryId,
    sizeId: sizeId,
  });

  await bagItem.updateOne({ quantity: updatedQuantity });

  const jewelry = await Jewelry.findById(jewelryId);

  oldQuantity = bagItem.quantity;

  if (oldQuantity < updatedQuantity) {
    difference = updatedQuantity - oldQuantity;
    newQuantity = jewelry.quantity - difference;
  } else {
    difference = oldQuantity - updatedQuantity;
    newQuantity = jewelry.quantity + difference;

    let isZero = Number(updatedQuantity) === 0;

    console.log(isZero);
    console.log(updatedQuantity);

    if (Number(updatedQuantity) === 0) {
      await bagItem.deleteOne();
    }
  }

  await jewelry.updateOne({ quantity: newQuantity });
};
