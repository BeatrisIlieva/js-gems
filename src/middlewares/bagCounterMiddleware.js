const ShoppingBag = require("../models/ShoppingBag");

exports.getBagCount = async (req, res, next) => {
    const userId = req.user._id;

    const items = await ShoppingBag.find({ user: userId }).lean();
    const bagCount = items.length;

    res.locals.bagCount = bagCount;
  
    next();
  };