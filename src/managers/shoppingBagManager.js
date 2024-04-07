const ShoppingBag = require("../models/ShoppingBag");
const Earring = require("../models/Jewelry");

exports.create = async (data) => {
    const shoppingBag = new ShoppingBag(data);

    await shoppingBag.save();

    return shoppingBag;
};

exports.getAll = async (userId) => {
    const result = await ShoppingBag.find({userId});

    const jewelries = [];
    for(let i = 0; i < result.length; i++){
        const jewelryId = result[i].jewelryId.toString();
        const jewelry = await Earring.findById(jewelryId).lean();
        jewelries.push(jewelry);
    }

    return jewelries;
};