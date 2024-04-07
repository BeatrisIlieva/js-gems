const mongoose = require("mongoose");

const Category = require("./models/Category");
const Metal = require("./models/Metal");
const StoneType = require("./models/StoneType");
const StoneColor = require("./models/StoneColor");
const Jewelry = require("./models/Jewelry");

async function populateDb() {
    await mongoose.connect("mongodb://127.0.0.1:27017/JSgems");

    await Category.create({
        title: "Earring",
    })

    await Category.create({
        title: "Necklace",
    })

    await Category.create({
        title: "Bracelet",
    })

    await Category.create({
        title: "Ring",
    })

    await Metal.create({
        title: "Yellow Gold",
    })

    await Metal.create({
        title: "Rose Gold",
    })

    await Metal.create({
        title: "White Gold",
    })

    await Metal.create({
        title: "Platinum",
    })

    await StoneType.create({
        title: "Spinel",
    })

    await StoneType.create({
        title: "Diamond",
    })

    await StoneType.create({
        title: "Emerald",
    })

    await StoneType.create({
        title: "Ruby",
    })

    await StoneType.create({
        title: "Sapphire",
    })

    await StoneColor.create({
        title: "Aquamarine",
    })

    await StoneColor.create({
        title: "Black",
    })

    await StoneColor.create({
        title: "Blue",
    })

    await StoneColor.create({
        title: "Green",
    })

    await StoneColor.create({
        title: "Pink",
    })

    await StoneColor.create({
        title: "Red",
    })

    await StoneColor.create({
        title: "White",
    })

    await StoneColor.create({
        title: "Yellow",
    })

    await Jewelry.create({
        title: "",
        firstImageUrl: "",
        secondImageUrl: "",
        price:,
        quantity:20,
        categoryId: "",
        metalId: "",
        goldCaratWeightId: "",
        stoneTypeId: "",
        stoneColorId: "",
        stoneCaratWeightId: "",
    })
  
}

populateDb();