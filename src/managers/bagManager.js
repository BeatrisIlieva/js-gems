const ShoppingBag = require("../models/ShoppingBag");
const Jewelry = require("../models/Jewelry");
const Size = require("../models/Size");
const { DEFAULT_MIN_QUANTITY } = require("../constants/shoppingBag");
const { Decimal128 } = require('mongodb');

const getOne = async ({userId, jewelryId, sizeId}) => {
  const bagItem = await ShoppingBag.findOne({
    user: userId,
    jewelry: jewelryId,
    size: sizeId,
  });

  return bagItem;
};

exports.create = async ({
  userId,
  jewelryId,
  sizeId,
  quantity: DEFAULT_ADD_QUANTITY,
}) => {

  bagItem = await ShoppingBag.create({
    user: userId,
    jewelry: jewelryId,
    size: sizeId,
    quantity: DEFAULT_ADD_QUANTITY,
  });

  await Jewelry.findOneAndUpdate({_id: jewelryId}, { $inc: { quantity: -1 } }, { new: true } );

  // const jewelry = await Jewelry.findById(jewelryId).updateOne(quantity, {});
  // oldQuantity = jewelry.quantity;
  // newQuantity = oldQuantity - 1;

  // jewelry.quantity = newQuantity;
  // await jewelry.save();

  await updateBagTotalPrice({userId, jewelryId, sizeId});
};


exports.update = async ({bagItemId, updatedQuantity, userId, sizeId}) => {
  const bagItem = await ShoppingBag.findById(bagItemId);

  const jewelryId = bagItem.jewelry.toString();

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
    await bagItem.updateOne({ quantity: updatedQuantity});

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
    await updateBagTotalPrice({userId, jewelryId, sizeId});
  }
};

exports.getAll = async (userId) => {
  const result = await ShoppingBag.find({ user: userId });

  const bagItems = {};

  let subTotal = 0;

  for (let i = 0; i < result.length; i++) {
    const jewelryId = result[i].jewelry;
    const bagItemId = result[i]._id;

    const jewelry = await Jewelry.findById(jewelryId)
      .populate("category")
      .populate("metals.kind")
      .populate("metals.caratWeight")
      .populate("stones.kind")
      .populate("stones.color")
      .populate("stones.caratWeight")
      .lean();
    const sizeId = result[i].size;
    const size = await Size.findById(sizeId).populate("measurement").lean();
    const quantity = result[i].quantity;
    const totalPrice = result[i].totalPrice;
    const maxQuantity = jewelry.quantity + quantity;
    bagItems[bagItemId] = {
      bagItemId,
      jewelry: jewelry,
      size: size,
      quantity: quantity,
      totalPrice: totalPrice,
      maxQuantity: maxQuantity,
      minQuantity: DEFAULT_MIN_QUANTITY,
    };
    subTotal += totalPrice;
  }

  return { bagItems, subTotal };
};

const getBagCount = async (userId) => {
  const items = await ShoppingBag.find({ user: userId }).lean();
  bagCount = items.length;

  return bagCount;
};

const updateBagTotalPrice = async ({userId, jewelryId, sizeId}) => {
  const bagItem = await getOne({ userId, jewelryId, sizeId });
  const bagItemQuantity = bagItem.quantity;
  const jewelry = await Jewelry.findById(jewelryId);
  const jewelryPrice = jewelry.price;

  const totalPrice = bagItemQuantity * jewelryPrice;

  bagItem.totalPrice = totalPrice;
  await bagItem.save();
}

exports.getOne = getOne;
exports.getBagCount = getBagCount;
exports.updateBagTotalPrice = updateBagTotalPrice;
