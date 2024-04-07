const Earring = require("../models/Jewelry");

exports.getAll = async () => {
    let earrings = await Earring.find().lean();

    return earrings;
};

exports.getOne = (earringId) => Earring.findById(earringId);