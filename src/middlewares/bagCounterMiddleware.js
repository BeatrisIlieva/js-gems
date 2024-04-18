const ShoppingBag = require("../models/ShoppingBag");
const { BAG_ITEMS } = require("../config/config");

exports.getBagCount = async (req, res, next) => {

    let userId;

    if(!req.user){
      bagCount = Object.keys(req.session.bagItems || {}).length;
      res.locals.bagCount = bagCount;
      next();
    } else {
      userId = req.user._id;
      const items = await ShoppingBag.find({ user: userId }).lean();
      const bagCount = items.length;
  
      res.locals.bagCount = bagCount;
    
      next();
    }
  };

