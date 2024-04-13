const Order = require("../models/Order");
const bagManager = require("../managers/bagManager");


exports.create = async (userId) => {
  const {bagItems, subTotal} = await bagManager.getAll(userId);
  console.groupCollapsed(bagItems);

  const order = await Order.create({
    user: userId,
    status: "Pending",
  });

  order.jewelries = bagItems;

  order.subTotal = subTotal;

  await order.save();

  return order;
};

exports.getOne = async (userId) => {
    const order = await Order.findOne({user: userId}).sort({ createdAt: -1 }).lean();
    return order;
}

