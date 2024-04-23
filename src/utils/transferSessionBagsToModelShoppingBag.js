const ShoppingBag = require("../models/ShoppingBag");

exports.transferSessionBagsToModelShoppingBag = async (sessionId, userId) => {
  await ShoppingBag.updateMany(
    { session: sessionId, user: null },
    { $set: { user: userId } }
  );
};
