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
    title: "Bracelet",
  });

  await Category.create({
    title: "Earring",
  });

  await Category.create({
    title: "Necklace",
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
    measurement: 19.3,
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
    price: 48000.00,
    quantity: 20,
    category: allCategories[1],
    metals: [
      {kind: allMetals[3], caratWeight: null},
    ],
    stones: [
      {kind: allStoneTypes[4], color: allStoneColors[4], caratWeight: 3.20 },
      {kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 1.98},
    ],
    sizes: [allSizes[2]],
  });

  await Jewelry.create({
    title: "Sunflower",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703183465/earrings/13/sunflower_earrings_sapphire_and_diamond_easppopetsf_e-1_npfqnr.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703183463/earrings/13/sunflower_earrings_sapphire_and_diamond_easppopetsf_e-2_hwz9zt.webp",
    price: 24000.00,
    quantity: 20,
    category: allCategories[1],
    metals: [
      {kind: allMetals[3], caratWeight: null},
    ],
    stones: [
      {kind: allStoneTypes[3], color: allStoneColors[2], caratWeight: 2.66 },
      {kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 0.90},
    ],
    sizes: [allSizes[0]],
  });

  await Jewelry.create({
    title: "Classics",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703178293/earrings/6/drop_earrings_diamond_and_ruby_earmrpsfpsd_431958_e-1_cycchy.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703178292/earrings/6/drop_earrings_diamond_and_ruby_earmrpsfpsd_431958_e-2_gs6ai0.webp",
    price: 97000.00,
    quantity: 20,
    category: allCategories[1],
    metals: [
      {kind: allMetals[3], caratWeight: null},
      {kind: allMetals[0], caratWeight: 18},
    ],
    stones: [
      {kind: allStoneTypes[3], color: allStoneColors[5], caratWeight: 2.91 },
      {kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 2.03},
    ],
    sizes: [allSizes[2]],
  });

  await Jewelry.create({
    title: "Berry",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703180217/earrings/11/berry_cluster_earrings_emerald_and_diamond_eaepclrfber_568120_e-1_xvkff7.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703180215/earrings/11/berry_cluster_earrings_emerald_and_diamond_eaepclrfber_568120_e-2_bcmypf.webp",
    price: 37000.00,
    quantity: 20,
    category: allCategories[1],
    metals: [
      {kind: allMetals[2], caratWeight: null},
    ],
    stones: [
      {kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 2.01 },
      {kind: allStoneTypes[2], color: allStoneColors[3], caratWeight: 3.35 },
    ],
    sizes: [allSizes[1]],
  });

  await Jewelry.create({
    title: "Belle",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703181891/earrings/14/belle_earrings_diamond_esdprd005bel_e-1_kdcplp.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703181893/earrings/14/belle_earrings_diamond_esdprd005bel_e-2_gq685k.webp",
    price: 42000.00,
    quantity: 20,
    category: allCategories[1],
    metals: [
      {kind: allMetals[3], caratWeight: null},
    ],
    stones: [
      {kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 0.90 },
    ],
    sizes: [allSizes[2]],
  });

  await Jewelry.create({
    title: "Multi Color Stone",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703180657/earrings/12/diamond_loop_earrings_full_motif_multi_color_stone_diamond_eamprpmel4c_e-1_vp47er.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703180659/earrings/12/diamond_loop_earrings_full_motif_multi_color_stone_diamond_eamprpmel4c_e-2_kvtj3v.webp",
    price: 38000.00,
    quantity: 20,
    category: allCategories[1],
    metals: [
      {kind: allMetals[3], caratWeight: null},
    ],
    stones: [
      {kind: allStoneTypes[4], color: allStoneColors[0], caratWeight: 1.35 },
      {kind: allStoneTypes[0], color: allStoneColors[1], caratWeight: null },
      {kind: allStoneTypes[4], color: allStoneColors[7], caratWeight: 1.35 },
      {kind: allStoneTypes[4], color: allStoneColors[4], caratWeight: 1.35 },
      {kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 2.66 },
    ],
    sizes: [allSizes[1]],
  });

  await Jewelry.create({
    title: "Heart",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703178867/earrings/7/classics_heart-shaped_diamond_earstuds_esdphs010si_e-1_lumsno.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703178866/earrings/7/classics_heart-shaped_diamond_earstuds_esdphs010si_e-2_w2aaff.webp",
    price: 14000.00,
    quantity: 20,
    category: allCategories[1],
    metals: [
      {kind: allMetals[3], caratWeight: null},
    ],
    stones: [
      {kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 1.00 },
    ],
    sizes: [allSizes[0]],
  });

  await Jewelry.create({
    title: "Daytime",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703179269/earrings/8/classics_earrings_diamond_eadpdrmedw_e-1_vptn8c.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703179268/earrings/8/classics_earrings_diamond_eadpdrmedw_e-2_h1edi3.webp",
    price: 27000.00,
    quantity: 20,
    category: allCategories[1],
    metals: [
      {kind: allMetals[3], caratWeight: null},
    ],
    stones: [
      {kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 6.41 },
    ],
    sizes: [allSizes[1]],
  });

  await Jewelry.create({
    title: "Daytime",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703179269/earrings/8/classics_earrings_diamond_eadpdrmedw_e-1_vptn8c.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703179268/earrings/8/classics_earrings_diamond_eadpdrmedw_e-2_h1edi3.webp",
    price: 27000.00,
    quantity: 20,
    category: allCategories[1],
    metals: [
      {kind: allMetals[3], caratWeight: null},
    ],
    stones: [
      {kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 6.41 },
    ],
    sizes: [allSizes[1]],
  });
}



populateDb();
