const mongoose = require("mongoose");

const Category = require("./models/Category");
const Metal = require("./models/Metal");
const StoneType = require("./models/StoneType");
const StoneColor = require("./models/StoneColor");
const Size = require("./models/Size");
const Jewelry = require("./models/Jewelry");

async function populateDb() {
  await mongoose.connect("mongodb://127.0.0.1:27017/JSgems");

  await Category.create({
    title: "Earring",
  });

  await Category.create({
    title: "Necklace",
  });

  await Category.create({
    title: "Bracelet",
  });

  await Category.create({
    title: "Ring",
  });

  await Metal.create({
    title: "Yellow Gold",
  });

  await Metal.create({
    title: "Rose Gold",
  });

  await Metal.create({
    title: "White Gold",
  });

  await Metal.create({
    title: "Platinum",
  });

  await StoneType.create({
    title: "Spinel",
  });

  await StoneType.create({
    title: "Diamond",
  });

  await StoneType.create({
    title: "Emerald",
  });

  await StoneType.create({
    title: "Ruby",
  });

  await StoneType.create({
    title: "Sapphire",
  });

  await StoneColor.create({
    title: "Aquamarine",
  });

  await StoneColor.create({
    title: "Black",
  });

  await StoneColor.create({
    title: "Blue",
  });

  await StoneColor.create({
    title: "Green",
  });

  await StoneColor.create({
    title: "Pink",
  });

  await StoneColor.create({
    title: "Red",
  });

  await StoneColor.create({
    title: "White",
  });

  await StoneColor.create({
    title: "Yellow",
  });

  await Size.create({
    measurement: 2.05,
  });

  await Size.create({
    measurement: 3.95,
  });

  await Size.create({
    measurement: 5.86,
  });

  await Size.create({
    measurement: 40.64,
  });

  await Size.create({
    measurement: 43.18,
  });

  await Size.create({
    measurement: 45.72,
  });

  await Size.create({
    measurement: 15.2,
  });

  await Size.create({
    measurement: 17.8,
  });

  await Size.create({
    measurement: 20.3,
  });

  await Size.create({
    measurement: 4.7,
  });

  await Size.create({
    measurement: 4.9,
  });

  await Size.create({
    measurement: 5.05,
  });

  const allCategories = await Category.find();
  const allMetals = await Metal.find();
  const allStoneTypes = await StoneType.find();
  const allStoneColors = await StoneColor.find();
  const allSizes = await Size.find();

  await Jewelry.create({
    title: "Beautiful Pink Flower",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703179446/earrings/9/forget_me_not_drop_earrings_diamond_and_pink_sapphire_eapspdrflrfmn_ee-1_kb2xap.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703179447/earrings/9/forget_me_not_drop_earrings_diamond_and_pink_sapphire_eapspdrflrfmn_ee-2_vgnjja.webp",
    price: 48000.0,
    quantity: 20,
    category: allCategories[0],
    metals: allMetals[3],
    // goldCaratWeightId: "",
    stones: [
      {kind: allStoneTypes[1], color: allStoneColors[4], caratWeight: 0.43 },
      {kind: allStoneTypes[4], color: allStoneColors[6] },
    ],
    // stoneCaratWeightId: "",
    sizes: [allSizes[0], allSizes[1], allSizes[2]],
  });
}

populateDb();
