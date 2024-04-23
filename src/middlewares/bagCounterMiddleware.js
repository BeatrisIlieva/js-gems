const ShoppingBag = require("../models/ShoppingBag");

exports.getBagCount = async (req, res, next) => {
  let userId;

  if (req.user) {
    userId = req.user._id;
  }
  const sessionId = req.session.id;
  const items = await ShoppingBag.find({
    $or: [{ user: userId }, { session: sessionId }],
  }).lean();
  const bagCount = items.length;

  res.locals.bagCount = bagCount;

  next();
};
