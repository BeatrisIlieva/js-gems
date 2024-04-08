const ShoppingBag = require("../models/ShoppingBag");
const Earring = require("../models/Jewelry");
const Size = require("../models/Size");
const {DEFAULT_MIN_QUANTITY} = require("../constants/shoppingBag");

exports.create = async (data) => {
    const shoppingBag = new ShoppingBag(data);

    await shoppingBag.save();

    return shoppingBag;
};

exports.getAll = async (userId) => {
    const result = await ShoppingBag.find({userId});

    const jewelries = {};
    for(let i = 0; i < result.length; i++){
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
        console.log(quantity);
        const maxQuantity = jewelry.quantity + quantity;
        jewelries[`${i}`] = {jewelry: jewelry, size: size, quantity: quantity, maxQuantity: maxQuantity, minQuantity: DEFAULT_MIN_QUANTITY};
    }

    return jewelries;
};