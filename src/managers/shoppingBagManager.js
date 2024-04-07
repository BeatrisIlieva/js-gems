const ShoppingBag = require("../models/ShoppingBag");

exports.create = async (data) => {
    const shoppingBag = new ShoppingBag(data);

    await shoppingBag.save();

    return shoppingBag;
};