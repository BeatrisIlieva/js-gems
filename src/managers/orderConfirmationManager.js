const Order = require("../models/Order");
const bagManager = require("../managers/bagManager");


exports.create = async (userId) => {
  const {bagItems, subTotal} = await bagManager.getAll(userId);

  const order = await Order.create({
    user: userId,
  });

  order.jewelries.push(bagItems);
  order.subTotal = subTotal;

  await order.save();

  return order;
};

exports.getOne = async (userId) => {
    const order = await Order.findOne({user: userId}).sort({ createdAt: -1 }).lean();
    return order;
}

// exports.getProfileDetails = async (userId) => {
//     const profile = Profile.findOne({user: userId});

//     const firstName = profile.firstName;
//     const lastName = profile.lastName;
//     const phone_number = profile
// }
