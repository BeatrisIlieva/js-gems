const mongoose = require("mongoose");

const shoppingBagSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    jewelryId: {
        type: mongoose.Types.ObjectId,
        ref: "Earring",
    }
});

const shoppingBag = mongoose.model("ShoppingBag", shoppingBagSchema);

module.exports = shoppingBag;