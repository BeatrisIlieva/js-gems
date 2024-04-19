const mongoose = require("mongoose");
const Jewelry = require("./models/Jewelry");
const Category = require("./models/Category");
const Metal = require("./models/Metal");
const JewelryMetals = require("./models/JewelryMetals");
const StoneType = require("./models/StoneType");
const StoneColor = require("./models/StoneColor");
const JewelryStones = require("./models/JewelryStones");
const Size = require("./models/Size");
const Inventory = require("./models/Inventory");

async function populateDb() {
  await mongoose.connect("mongodb://127.0.0.1:27017/JSGems");

  await Category.insertMany([
    {
      title: "Bracelet",
    },
    {
      title: "Earring",
    },
    {
      title: "Necklace",
    },
    {
      title: "Ring",
    },
  ]);

  await Metal.insertMany([
    {
      title: "Yellow Gold",
    },
    {
      title: "Rose Gold",
    },
    {
      title: "White Gold",
    },
    {
      title: "Platinum",
    },
  ]);

  await StoneType.insertMany([
    {
      title: "Spinel",
    },
    {
      title: "Diamond",
    },
    {
      title: "Emerald",
    },
    {
      title: "Ruby",
    },
    {
      title: "Sapphire",
    },
  ]);

  await StoneColor.insertMany([
    {
      title: "Aquamarine",
    },
    {
      title: "Black",
    },
    {
      title: "Blue",
    },
    {
      title: "Green",
    },
    {
      title: "Pink",
    },
    {
      title: "Red",
    },
    {
      title: "White",
    },
    {
      title: "Yellow",
    },
  ]);

  await Size.insertMany([
    {
      measurement: 2.05,
    },
    {
      measurement: 3.95,
    },
    {
      measurement: 5.86,
    },
    {
      measurement: 40.64,
    },
    {
      measurement: 43.18,
    },
    {
      measurement: 45.72,
    },
    {
      measurement: 15.2,
    },
    {
      measurement: 17.8,
    },
    {
      measurement: 19.3,
    },
    {
      measurement: 4.7,
    },
    {
      measurement: 4.9,
    },
    {
      measurement: 5.05,
    },
  ]);

  const allCategories = await Category.find();
  const allMetals = await Metal.find();
  const allStoneTypes = await StoneType.find();
  const allStoneColors = await StoneColor.find();
  const allSizes = await Size.find();

  await Jewelry.insertMany([
    {
      title: "Beautiful Pink Flower",
      firstImageUrl:
        "https://res.cloudinary.com/deztgvefu/image/upload/v1703179446/earrings/9/forget_me_not_drop_earrings_diamond_and_pink_sapphire_eapspdrflrfmn_ee-1_kb2xap.webp",
      secondImageUrl:
        "https://res.cloudinary.com/deztgvefu/image/upload/v1703179447/earrings/9/forget_me_not_drop_earrings_diamond_and_pink_sapphire_eapspdrflrfmn_ee-2_vgnjja.webp",
      category: allCategories[1],
    },
    {
      title: "Sunflower",
      firstImageUrl:
        "https://res.cloudinary.com/deztgvefu/image/upload/v1703183465/earrings/13/sunflower_earrings_sapphire_and_diamond_easppopetsf_e-1_npfqnr.webp",
      secondImageUrl:
        "https://res.cloudinary.com/deztgvefu/image/upload/v1703183463/earrings/13/sunflower_earrings_sapphire_and_diamond_easppopetsf_e-2_hwz9zt.webp",
      category: allCategories[1],
    },
    {
      title: "Classics",
      firstImageUrl:
        "https://res.cloudinary.com/deztgvefu/image/upload/v1703178293/earrings/6/drop_earrings_diamond_and_ruby_earmrpsfpsd_431958_e-1_cycchy.webp",
      secondImageUrl:
        "https://res.cloudinary.com/deztgvefu/image/upload/v1703178292/earrings/6/drop_earrings_diamond_and_ruby_earmrpsfpsd_431958_e-2_gs6ai0.webp",
      category: allCategories[1],
    },
    {
      title: "Berry",
      firstImageUrl:
        "https://res.cloudinary.com/deztgvefu/image/upload/v1703180217/earrings/11/berry_cluster_earrings_emerald_and_diamond_eaepclrfber_568120_e-1_xvkff7.webp",
      secondImageUrl:
        "https://res.cloudinary.com/deztgvefu/image/upload/v1703180215/earrings/11/berry_cluster_earrings_emerald_and_diamond_eaepclrfber_568120_e-2_bcmypf.webp",
      category: allCategories[1],
    },
    {
      title: "Belle",
      firstImageUrl:
        "https://res.cloudinary.com/deztgvefu/image/upload/v1703181891/earrings/14/belle_earrings_diamond_esdprd005bel_e-1_kdcplp.webp",
      secondImageUrl:
        "https://res.cloudinary.com/deztgvefu/image/upload/v1703181893/earrings/14/belle_earrings_diamond_esdprd005bel_e-2_gq685k.webp",
      category: allCategories[1],
    },
    {
      title: "Multi Color Stone",
      firstImageUrl:
        "https://res.cloudinary.com/deztgvefu/image/upload/v1703180657/earrings/12/diamond_loop_earrings_full_motif_multi_color_stone_diamond_eamprpmel4c_e-1_vp47er.webp",
      secondImageUrl:
        "https://res.cloudinary.com/deztgvefu/image/upload/v1703180659/earrings/12/diamond_loop_earrings_full_motif_multi_color_stone_diamond_eamprpmel4c_e-2_kvtj3v.webp",
      category: allCategories[1],
    },
    {
      title: "Heart",
      firstImageUrl:
        "https://res.cloudinary.com/deztgvefu/image/upload/v1703178867/earrings/7/classics_heart-shaped_diamond_earstuds_esdphs010si_e-1_lumsno.webp",
      secondImageUrl:
        "https://res.cloudinary.com/deztgvefu/image/upload/v1703178866/earrings/7/classics_heart-shaped_diamond_earstuds_esdphs010si_e-2_w2aaff.webp",
      category: allCategories[1],
    },
    {
      title: "Daytime",
      firstImageUrl:
        "https://res.cloudinary.com/deztgvefu/image/upload/v1703179269/earrings/8/classics_earrings_diamond_eadpdrmedw_e-1_vptn8c.webp",
      secondImageUrl:
        "https://res.cloudinary.com/deztgvefu/image/upload/v1703179268/earrings/8/classics_earrings_diamond_eadpdrmedw_e-2_h1edi3.webp",
      category: allCategories[1],
    },
    {
      title: "Chandelier",
      firstImageUrl:
        "https://res.cloudinary.com/deztgvefu/image/upload/v1703167483/earrings/1/diamond_chandelier_earrings.webp",
      secondImageUrl:
        "https://res.cloudinary.com/deztgvefu/image/upload/v1703167483/earrings/1/diamond_chandelier_earrings_eadpchsmct.webp",
      category: allCategories[1],
    },
    {
      title: "Unforgettable",
      firstImageUrl:
        "https://res.cloudinary.com/deztgvefu/image/upload/v1703262109/bracelets/8/forget_me_not_bracelet_diamond_and_sapphire_brsprfflrfmn_e_1_bc0a5y.webp",
      secondImageUrl:
        "https://res.cloudinary.com/deztgvefu/image/upload/v1703262106/bracelets/8/forget_me_not_bracelet_diamond_and_sapphire_brsprfflrfmn_e_2_yli2iv.webp",
      category: allCategories[0],
    },
    {
      title: "Lily",
      firstImageUrl:
        "https://res.cloudinary.com/deztgvefu/image/upload/v1703258159/bracelets/1/lily_cluster_bracelet_diamond_rose_gold_brdrsm1mlc_e-1_csp0lg.webp",
      secondImageUrl:
        "https://res.cloudinary.com/deztgvefu/image/upload/v1703258156/bracelets/1/lily_cluster_bracelet_diamond_rose_gold_brdrsm1mlc_e-2_zihj3x.webp",
      category: allCategories[0],
    },
    {
      title: "Pink Flower",
      firstImageUrl:
        "https://res.cloudinary.com/deztgvefu/image/upload/v1703259627/bracelets/3/forget_me_not_bracelet_diamond_and_pink_sapphire_brpsprfflrfmn_e_1_h0xaug.webp",
      secondImageUrl:
        "https://res.cloudinary.com/deztgvefu/image/upload/v1703259630/bracelets/3/forget_me_not_bracelet_diamond_and_pink_sapphire_brpsprfflrfmn_e_2_qlogdk.webp",
      price: 163000.0,
      quantity: 20,
      category: allCategories[0],
      metals: [{ kind: allMetals[3], caratWeight: null }],
      stones: [
        { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 4.37 },
        { kind: allStoneTypes[4], color: allStoneColors[4], caratWeight: 4.43 },
      ],
      sizes: [allSizes[6], allSizes[7], allSizes[8]],
    }
  ]);

  const allJewelries = await Jewelry.find();

  await JewelryMetals.insertMany([
    {
      jewelry: allJewelries[0],
      metal: allMetals[3],
    },
    {
      jewelry: allJewelries[1],
      metal: allMetals[3],
    },
    {
      jewelry: allJewelries[2],
      metal: allMetals[3],
    },
    {
      jewelry: allJewelries[2],
      metal: allMetals[0],
      caratWeight: 18,
    },
    {
      jewelry: allJewelries[3],
      metal: allMetals[2],
      caratWeight: 18,
    },
    {
      jewelry: allJewelries[4],
      metal: allMetals[3],
    },
    {
      jewelry: allJewelries[5],
      metal: allMetals[3],
    },
    {
      jewelry: allJewelries[6],
      metal: allMetals[3],
    },
    {
      jewelry: allJewelries[7],
      metal: allMetals[3],
    },
    {
      jewelry: allJewelries[8],
      metal: allMetals[3],
    },
    {
      jewelry: allJewelries[9],
      metal: allMetals[3],
    },
    {
      jewelry: allJewelries[10],
      metal: allMetals[1],
      caratWeight: 18 
    },
    {
      jewelry: allJewelries[11],
      metal: allMetals[3],
    },
  ]);

  await JewelryStones.insertMany([
    {
      jewelry: allJewelries[0],
      stoneType: allStoneTypes[4],
      stoneColor: allStoneColors[4],
      caratWeight: 3.2,
    },
    {
      jewelry: allJewelries[0],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
      caratWeight: 1.98,
    },
    {
      jewelry: allJewelries[1],
      stoneType: allStoneTypes[3],
      stoneColor: allStoneColors[2],
      caratWeight: 2.66,
    },
    {
      jewelry: allJewelries[1],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
      caratWeight: 0.9,
    },
    {
      jewelry: allJewelries[2],
      stoneType: allStoneTypes[3],
      stoneColor: allStoneColors[5],
      caratWeight: 2.91,
    },
    {
      jewelry: allJewelries[2],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
      caratWeight: 2.03,
    },
    {
      jewelry: allJewelries[3],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
      caratWeight: 3.35,
    },
    {
      jewelry: allJewelries[3],
      stoneType: allStoneTypes[2],
      stoneColor: allStoneColors[3],
    },
    {
      jewelry: allJewelries[4],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
      caratWeight: 0.9,
    },
    {
      jewelry: allJewelries[5],
      stoneType: allStoneTypes[4],
      stoneColor: allStoneColors[0],
      caratWeight: 1.35,
    },
    {
      jewelry: allJewelries[5],
      stoneType: allStoneTypes[0],
      stoneColor: allStoneColors[1],
    },
    {
      jewelry: allJewelries[5],
      stoneType: allStoneTypes[4],
      stoneColor: allStoneColors[7],
      caratWeight: 1.35,
    },
    {
      jewelry: allJewelries[5],
      stoneType: allStoneTypes[4],
      stoneColor: allStoneColors[4],
      caratWeight: 1.35,
    },
    {
      jewelry: allJewelries[5],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
      caratWeight: 2.66,
    },
    {
      jewelry: allJewelries[6],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
      caratWeight: 1.26,
    },
    {
      jewelry: allJewelries[7],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
      caratWeight: 6.41,
    },
    {
      jewelry: allJewelries[8],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
      caratWeight: 16.81,
    },
    {
      jewelry: allJewelries[9],
      stoneType: allStoneTypes[3],
      stoneColor: allStoneColors[2],
      caratWeight: 4.43,
    },
    {
      jewelry: allJewelries[9],
      stoneType: allStoneTypes[4],
      stoneColor: allStoneColors[0],
      caratWeight: 3.22,
    },
    {
      jewelry: allJewelries[9],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
      caratWeight: 4.37,
    },
    {
      jewelry: allJewelries[10],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
      caratWeight: 0.31,
    },
    {
      jewelry: allJewelries[11],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
      caratWeight: 4.37,
    },
    {
      jewelry: allJewelries[11],
      stoneType: allStoneTypes[4],
      stoneColor: allStoneColors[4],
      caratWeight: 4.43,
    },
  ]);

  await Inventory.insertMany([
    {
      jewelry: allJewelries[0],
      size: allSizes[2],
      quantity: 3,
      price: 48000,
    },
    {
      jewelry: allJewelries[1],
      size: allSizes[0],
      quantity: 3,
      price: 24000,
    },
    {
      jewelry: allJewelries[2],
      size: allSizes[2],
      quantity: 3,
      price: 97000,
    },
    {
      jewelry: allJewelries[3],
      size: allSizes[1],
      quantity: 3,
      price: 37000,
    },
    {
      jewelry: allJewelries[4],
      size: allSizes[1],
      quantity: 3,
      price: 42000,
    },
    {
      jewelry: allJewelries[5],
      size: allSizes[1],
      quantity: 3,
      price: 38000,
    },
    {
      jewelry: allJewelries[6],
      size: allSizes[0],
      quantity: 3,
      price: 14000,
    },
    {
      jewelry: allJewelries[7],
      size: allSizes[1],
      quantity: 3,
      price: 27000,
    },
    {
      jewelry: allJewelries[8],
      size: allSizes[2],
      quantity: 3,
      price: 120000,
    },
    {
      jewelry: allJewelries[9],
      size: allSizes[6],
      quantity: 3,
      price: 24000,
    },
    {
      jewelry: allJewelries[9],
      size: allSizes[7],
      quantity: 3,
      price: 24000,
    },
    {
      jewelry: allJewelries[9],
      size: allSizes[8],
      quantity: 3,
      price: 24000,
    },
    {
      jewelry: allJewelries[10],
      size: allSizes[6],
      quantity: 3,
      price: 32000,
    },
    {
      jewelry: allJewelries[10],
      size: allSizes[7],
      quantity: 3,
      price: 32000,
    },
    {
      jewelry: allJewelries[10],
      size: allSizes[8],
      quantity: 3,
      price: 32000,
    },
    {
      jewelry: allJewelries[11],
      size: allSizes[6],
      quantity: 3,
      price: 163000,
    },
    {
      jewelry: allJewelries[11],
      size: allSizes[7],
      quantity: 3,
      price: 163000,
    },
    {
      jewelry: allJewelries[11],
      size: allSizes[8],
      quantity: 3,
      price: 163000,
    },
  ]);


  await Jewelry.create({
    title: "Oval",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703260442/bracelets/4/oval_diamond_bracelet_brdpsfovov_e-1_jon3ta.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703260439/bracelets/4/oval_diamond_bracelet_brdpsfovov_e-2_lowjbd.webp",
    price: 56000.0,
    quantity: 20,
    category: allCategories[0],
    metals: [{ kind: allMetals[3], caratWeight: null }],
    stones: [
      { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 22.09 },
    ],
    sizes: [allSizes[6], allSizes[7], allSizes[8]],
  });

  await Jewelry.create({
    title: "Dream",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703261691/bracelets/7/forget-me-not_bracelet_ruby_and_diamond_brrprfflrfmn_e-1_mx30fj.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703261688/bracelets/7/forget-me-not_bracelet_ruby_and_diamond_brrprfflrfmn_e-2_cqsw89.webp",
    price: 44000.0,
    quantity: 20,
    category: allCategories[0],
    metals: [{ kind: allMetals[3], caratWeight: null }],
    stones: [
      { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 4.37 },
      { kind: allStoneTypes[3], color: allStoneColors[5], caratWeight: 4.43 },
    ],
    sizes: [allSizes[6], allSizes[7], allSizes[8]],
  });

  await Jewelry.create({
    title: "Gates",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703265142/bracelets/9/gates_bracelet_diamond_yellow_gold_brdyrd1mwg_e-1_yxkx8q.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703265151/bracelets/9/winston_gates_bracelet_diamond_yellow_gold_brdyrd1mwg_e-2_lo9uge.webp",
    price: 33000.0,
    quantity: 20,
    category: allCategories[0],
    metals: [{ kind: allMetals[0], caratWeight: 18 }],
    stones: [
      { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 4.41 },
    ],
    sizes: [allSizes[6], allSizes[7], allSizes[8]],
  });

  await Jewelry.create({
    title: "Flower",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703260723/bracelets/5/diamond_loop_full_motif_diamond_bracelet_brdprp1ml4c_e-1_xioiw0.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703260720/bracelets/5/diamond_loop_full_motif_diamond_bracelet_brdprp1ml4c_e-2_q6cxzy.webp",
    price: 36000.0,
    quantity: 20,
    category: allCategories[0],
    metals: [{ kind: allMetals[3], caratWeight: null }],
    stones: [
      { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 0.29 },
    ],
    sizes: [allSizes[6], allSizes[7], allSizes[8]],
  });

  await Jewelry.create({
    title: "Bezel-Set",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703261003/bracelets/6/classics_bezel-set_diamond_bracelet_brdprfsfbz_e-1_bj23kv.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703261006/bracelets/6/classics_bezel-set_diamond_bracelet_brdprfsfbz_e-2_e9age8.webp",
    price: 55000.0,
    quantity: 20,
    category: allCategories[0],
    metals: [{ kind: allMetals[2], caratWeight: 18 }],
    stones: [
      { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 8.27 },
    ],
    sizes: [allSizes[6], allSizes[7], allSizes[8]],
  });

  await Jewelry.create({
    title: "Tennis",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703258603/bracelets/2/classics_round_brilliant_diamond_tennis_bracelet_brdpsrp40te_e-1_w4fviy.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703258601/bracelets/2/classics_round_brilliant_diamond_tennis_bracelet_brdpsrp40te_e-2_jth1ky.webp",
    price: 78000.0,
    quantity: 20,
    category: allCategories[0],
    metals: [{ kind: allMetals[2], caratWeight: 18 }],
    stones: [
      { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 14.62 },
    ],
    sizes: [allSizes[6], allSizes[7], allSizes[8]],
  });

  await Jewelry.create({
    title: "The Duchess",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703429659/necklaces/9/hj_ra_3_duchess_necklace_a_vowktn.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703429659/necklaces/9/hj_ra_3_duchess_necklace_b_k58hlv.webp",
    price: 218000.0,
    quantity: 20,
    category: allCategories[2],
    metals: [{ kind: allMetals[3], caratWeight: null }],
    stones: [
      { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 14.62 },
      { kind: allStoneTypes[1], color: allStoneColors[7], caratWeight: 40.11 },
    ],
    sizes: [allSizes[3], allSizes[4], allSizes[5]],
  });

  await Jewelry.create({
    title: "Aquamarine",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703428360/necklaces/1/sparkling_cluster_sap_aqua_and_diamond_necklace_nksaqpclrfspc_e-2_gimdwb.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703428360/necklaces/1/sparkling_cluster_sap_aqua_and_diamond_necklace_nksaqpclrfspc_e-1_c2ojj1.webp",
    price: 63000.0,
    quantity: 20,
    category: allCategories[2],
    metals: [{ kind: allMetals[3], caratWeight: null }],
    stones: [
      { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 8.73 },
      { kind: allStoneTypes[3], color: allStoneColors[2], caratWeight: 4.45 },
      { kind: allStoneTypes[4], color: allStoneColors[0], caratWeight: 2.8 },
    ],
    sizes: [allSizes[3], allSizes[4], allSizes[5]],
  });

  await Jewelry.create({
    title: "Lily",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703429368/necklaces/8/lily_cluster_necklace_diamond_yellow_gold_nkdyrd13mlc_e-2_ow1yxh.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703429367/necklaces/8/lily_cluster_necklace_diamond_yellow_gold_nkdyrd13mlc_e-1_e4er5b.webp",
    price: 39000.0,
    quantity: 20,
    category: allCategories[2],
    metals: [{ kind: allMetals[0], caratWeight: 18 }],
    stones: [
      { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 0.04 },
    ],
    sizes: [allSizes[3], allSizes[4], allSizes[5]],
  });

  await Jewelry.create({
    title: "Beautiful Pink Flower",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703270087/necklaces/3/forget_me_not_lariat_necklace_diamond_and_pink_sapphire_nkpspltflrfmn_e_2_fqgnn6.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703270083/necklaces/3/forget_me_not_lariat_necklace_diamond_and_pink_sapphire_nkpspltflrfmn_e_1_zegnl4.webp",
    price: 97000.0,
    quantity: 20,
    category: allCategories[2],
    metals: [{ kind: allMetals[3], caratWeight: null }],
    stones: [
      { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 8.6 },
      { kind: allStoneTypes[4], color: allStoneColors[4], caratWeight: 8.61 },
    ],
    sizes: [allSizes[3], allSizes[4], allSizes[5]],
  });

  await Jewelry.create({
    title: "Multi Color Stone",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703270516/necklaces/4/diamond_loop_pendant_full_motif_multi_color_stone_diamond_pemprpmel4c_e-2_w82uyl.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703270512/necklaces/4/diamond_loop_pendant_full_motif_multi_color_stone_diamond_pemprpmel4c_e-3_hlm1rb.webp",
    price: 86000.0,
    quantity: 20,
    category: allCategories[2],
    metals: [{ kind: allMetals[3], caratWeight: null }],
    stones: [
      { kind: allStoneTypes[4], color: allStoneColors[7], caratWeight: 1.35 },
      { kind: allStoneTypes[0], color: allStoneColors[1], caratWeight: null },
      { kind: allStoneTypes[4], color: allStoneColors[4], caratWeight: 1.35 },
      { kind: allStoneTypes[4], color: allStoneColors[0], caratWeight: 1.35 },
      { kind: allStoneTypes[1], color: allStoneColors[7], caratWeight: 2.66 },
    ],
    sizes: [allSizes[3], allSizes[4], allSizes[5]],
  });

  await Jewelry.create({
    title: "Berry",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703271598/necklaces/6/berry_cluster_pendant_emerald_and_diamond_peepclrfber_e-1_lts2xk.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703271594/necklaces/6/berry_cluster_pendant_emerald_and_diamond_peepclrfber_e-2_u34ipb.webp",
    price: 63000.0,
    quantity: 20,
    category: allCategories[2],
    metals: [{ kind: allMetals[2], caratWeight: 18 }],
    stones: [
      { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 2.01 },
      { kind: allStoneTypes[2], color: allStoneColors[3], caratWeight: 1.39 },
    ],
    sizes: [allSizes[3], allSizes[4], allSizes[5]],
  });

  await Jewelry.create({
    title: "Heart",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703271283/necklaces/5/open_cluster_large_heart_diamond_pendant_pedphslgoc_e-1h_eruvjx.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703271288/necklaces/5/open_cluster_large_heart_diamond_pendant_pedphslgoc_e-2h_oorrck.webp",
    price: 74000.0,
    quantity: 20,
    category: allCategories[2],
    metals: [{ kind: allMetals[3], caratWeight: null }],
    stones: [
      { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 3.9 },
    ],
    sizes: [allSizes[3], allSizes[4], allSizes[5]],
  });

  await Jewelry.create({
    title: "Riviere",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703429016/necklaces/7/marquise_riviere_diamond_necklace_nkdpmq003vri_e-2_ia60id.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703429016/necklaces/7/marquise_riviere_diamond_necklace_nkdpmq003vri_e-1_oipabr.webp",
    price: 43000.0,
    quantity: 20,
    category: allCategories[2],
    metals: [{ kind: allMetals[2], caratWeight: 18 }],
    stones: [
      { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 23.25 },
    ],
    sizes: [allSizes[3], allSizes[4], allSizes[5]],
  });

  await Jewelry.create({
    title: "Pink Flower",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703269036/necklaces/2/forget_me_not_pendant_diamond_and_pink_sapphire_pepsprfflrfmn_e_1_i09w6i.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703269032/necklaces/2/forget_me_not_pendant_diamond_and_pink_sapphire_pepsprfflrfmn_e_2_b2lu73.webp",
    price: 52000.0,
    quantity: 20,
    category: allCategories[2],
    metals: [{ kind: allMetals[3], caratWeight: null }],
    stones: [
      { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 4.24 },
      { kind: allStoneTypes[4], color: allStoneColors[4], caratWeight: 4.36 },
    ],
    sizes: [allSizes[3], allSizes[4], allSizes[5]],
  });

  await Jewelry.create({
    title: "Cushion-Cut",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703433929/rings/1/cushion_cut_engagement_ring_yellow_diamond_rgyedgcu015mic_e-1_ghcqyq.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703433928/rings/1/cushion_cut_engagement_ring_yellow_diamond_rgyedgcu015mic_e-2_lea4hu.webp",
    price: 53000.0,
    quantity: 20,
    category: allCategories[3],
    metals: [{ kind: allMetals[3], caratWeight: null }],
    stones: [
      { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 0.36 },
      { kind: allStoneTypes[1], color: allStoneColors[7], caratWeight: 0.98 },
    ],
    sizes: [allSizes[9], allSizes[10], allSizes[11]],
  });

  await Jewelry.create({
    title: "Sparkling Cluster",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703434446/rings/2/sparkling_cluster_sap_aqua_and_diamond_ring_frsaqpclrfspc_e-1h_znic2h.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703434445/rings/2/sparkling_cluster_sap_aqua_and_diamond_ring_frsaqpclrfspc_e-2h_kmqowy.webp",
    price: 48000.0,
    quantity: 20,
    category: allCategories[3],
    metals: [{ kind: allMetals[3], caratWeight: null }],
    stones: [
      { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 1.19 },
      { kind: allStoneTypes[3], color: allStoneColors[2], caratWeight: 0.38 },
      { kind: allStoneTypes[4], color: allStoneColors[0], caratWeight: 1.08 },
    ],
    sizes: [allSizes[9], allSizes[10], allSizes[11]],
  });

  await Jewelry.create({
    title: "Pink Flower",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703434808/rings/3/forget_me_not_ring_diamond_and_pink_sapphire_frpsprfflrfmn_e_1_cy6fmu.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703434809/rings/3/forget_me_not_ring_diamond_and_pink_sapphire_frpsprfflrfmn_e_2_r9cunk.webp",
    price: 33000.0,
    quantity: 20,
    category: allCategories[3],
    metals: [{ kind: allMetals[3], caratWeight: null }],
    stones: [
      { kind: allStoneTypes[4], color: allStoneColors[4], caratWeight: 2.22 },
      { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 0.05 },
    ],
    sizes: [allSizes[9], allSizes[10], allSizes[11]],
  });

  await Jewelry.create({
    title: "Ruby",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703435551/rings/4/ruby_and_diamond_ring_ruby_and_diamond_frrmrpddhwf_e-1_w6ovk2.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703435552/rings/4/ruby_and_diamond_ring_ruby_and_diamond_frrmrpddhwf_e-2_sas5gh.webp",
    price: 36000.0,
    quantity: 20,
    category: allCategories[3],
    metals: [
      { kind: allMetals[3], caratWeight: null },
      { kind: allMetals[0], caratWeight: 18 },
    ],
    stones: [
      { kind: allStoneTypes[3], color: allStoneColors[5], caratWeight: 1.32 },
      { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 3.29 },
    ],
    sizes: [allSizes[9], allSizes[10], allSizes[11]],
  });

  await Jewelry.create({
    title: "Clssic",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703435818/rings/5/classic_engagement_ring_emerald_rgemec020tb_e-1_remfd3.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703435820/rings/5/classic_engagement_ring_emerald_rgemec020tb_e-2_qqna1u.webp",
    price: 52000.0,
    quantity: 20,
    category: allCategories[3],
    metals: [
      { kind: allMetals[3], caratWeight: null },
      { kind: allMetals[0], caratWeight: 18 },
    ],
    stones: [
      { kind: allStoneTypes[2], color: allStoneColors[3], caratWeight: 2.32 },
    ],
    sizes: [allSizes[9], allSizes[10], allSizes[11]],
  });

  await Jewelry.create({
    title: "Lily",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703437558/rings/6/lily_cluster_ring_diamond_rose_gold_frdrmqrflc_e-1_sap3ct.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703437556/rings/6/lily_cluster_ring_diamond_rose_gold_frdrmqrflc_e-2_i3qn33.webp",
    price: 23000.0,
    quantity: 20,
    category: allCategories[3],
    metals: [{ kind: allMetals[1], caratWeight: 18 }],
    stones: [
      { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 0.41 },
    ],
    sizes: [allSizes[9], allSizes[10], allSizes[11]],
  });

  await Jewelry.create({
    title: "Sunflower",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703436504/rings/7/sunflower_ring_diamond_frdptw007sf_e-1_poiqqc.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703436502/rings/7/sunflower_ring_diamond_frdptw007sf_e-2_grj12r.webp",
    price: 57000.0,
    quantity: 20,
    category: allCategories[3],
    metals: [{ kind: allMetals[2], caratWeight: 18 }],
    stones: [
      { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 0.31 },
    ],
    sizes: [allSizes[9], allSizes[10], allSizes[11]],
  });

  await Jewelry.create({
    title: "Heart",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703436707/rings/8/classic_winston_engagement_ring_diamond_rgdphs010tb_e-1_ew1irj.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703436707/rings/8/classic_winston_engagement_ring_diamond_rgdphs010tb_e-1_ew1irj.webp",
    price: 29000.0,
    quantity: 20,
    category: allCategories[3],
    metals: [{ kind: allMetals[2], caratWeight: 18 }],
    stones: [
      { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 0.34 },
    ],
    sizes: [allSizes[9], allSizes[10], allSizes[11]],
  });

  await Jewelry.create({
    title: "Bridal Couture",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703436882/rings/9/bridal_couture_by_harry_winston_engagement_ring_emerald_cut_diamond_platinum_rgdpec050ub7_550070_e_1_zgzgx4.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1703436854/rings/9/bridal_couture_by_harry_winston_engagement_ring_emerald_cut_diamond_platinum_rgdpec050ub7_550070_e_2_ovqn8e.webp",
    price: 46000.0,
    quantity: 20,
    category: allCategories[3],
    metals: [{ kind: allMetals[2], caratWeight: 18 }],
    stones: [
      { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 0.36 },
    ],
    sizes: [allSizes[9], allSizes[10], allSizes[11]],
  });
}

populateDb();

//   await Jewelry.create({
//     title: "Beautiful Pink Flower",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703179446/earrings/9/forget_me_not_drop_earrings_diamond_and_pink_sapphire_eapspdrflrfmn_ee-1_kb2xap.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703179447/earrings/9/forget_me_not_drop_earrings_diamond_and_pink_sapphire_eapspdrflrfmn_ee-2_vgnjja.webp",
//     price: 48000.0,
//     quantity: 20,
//     category: allCategories[1],
//     metals: [{ kind: allMetals[3], caratWeight: null }],
//     stones: [
//       { kind: allStoneTypes[4], color: allStoneColors[4], caratWeight: 3.2 },
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 1.98 },
//     ],
//     sizes: [allSizes[2]],
//   });

//   await Jewelry.create({
//     title: "Sunflower",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703183465/earrings/13/sunflower_earrings_sapphire_and_diamond_easppopetsf_e-1_npfqnr.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703183463/earrings/13/sunflower_earrings_sapphire_and_diamond_easppopetsf_e-2_hwz9zt.webp",
//     price: 24000.0,
//     quantity: 20,
//     category: allCategories[1],
//     metals: [{ kind: allMetals[3], caratWeight: null }],
//     stones: [
//       { kind: allStoneTypes[3], color: allStoneColors[2], caratWeight: 2.66 },
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 0.9 },
//     ],
//     sizes: [allSizes[0]],
//   });

//   await Jewelry.create({
//     title: "Classics",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703178293/earrings/6/drop_earrings_diamond_and_ruby_earmrpsfpsd_431958_e-1_cycchy.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703178292/earrings/6/drop_earrings_diamond_and_ruby_earmrpsfpsd_431958_e-2_gs6ai0.webp",
//     price: 97000.0,
//     quantity: 20,
//     category: allCategories[1],
//     metals: [
//       { kind: allMetals[3], caratWeight: null },
//       { kind: allMetals[0], caratWeight: 18 },
//     ],
//     stones: [
//       { kind: allStoneTypes[3], color: allStoneColors[5], caratWeight: 2.91 },
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 2.03 },
//     ],
//     sizes: [allSizes[2]],
//   });

//   await Jewelry.create({
//     title: "Berry",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703180217/earrings/11/berry_cluster_earrings_emerald_and_diamond_eaepclrfber_568120_e-1_xvkff7.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703180215/earrings/11/berry_cluster_earrings_emerald_and_diamond_eaepclrfber_568120_e-2_bcmypf.webp",
//     price: 37000.0,
//     quantity: 20,
//     category: allCategories[1],
//     metals: [{ kind: allMetals[1], caratWeight: null }],
//     stones: [
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 2.01 },
//       { kind: allStoneTypes[2], color: allStoneColors[3], caratWeight: 3.35 },
//     ],
//     sizes: [allSizes[1]],
//   });

//   await Jewelry.create({
//     title: "Belle",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703181891/earrings/14/belle_earrings_diamond_esdprd005bel_e-1_kdcplp.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703181893/earrings/14/belle_earrings_diamond_esdprd005bel_e-2_gq685k.webp",
//     price: 42000.0,
//     quantity: 20,
//     category: allCategories[1],
//     metals: [{ kind: allMetals[3], caratWeight: null }],
//     stones: [
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 0.9 },
//     ],
//     sizes: [allSizes[1]],
//   });

//   await Jewelry.create({
//     title: "Multi Color Stone",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703180657/earrings/12/diamond_loop_earrings_full_motif_multi_color_stone_diamond_eamprpmel4c_e-1_vp47er.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703180659/earrings/12/diamond_loop_earrings_full_motif_multi_color_stone_diamond_eamprpmel4c_e-2_kvtj3v.webp",
//     price: 38000.0,
//     quantity: 20,
//     category: allCategories[1],
//     metals: [{ kind: allMetals[3], caratWeight: null }],
//     stones: [
//       { kind: allStoneTypes[4], color: allStoneColors[0], caratWeight: 1.35 },
//       { kind: allStoneTypes[0], color: allStoneColors[1], caratWeight: null },
//       { kind: allStoneTypes[4], color: allStoneColors[7], caratWeight: 1.35 },
//       { kind: allStoneTypes[4], color: allStoneColors[4], caratWeight: 1.35 },
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 2.66 },
//     ],
//     sizes: [allSizes[1]],
//   });

//   await Jewelry.create({
//     title: "Heart",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703178867/earrings/7/classics_heart-shaped_diamond_earstuds_esdphs010si_e-1_lumsno.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703178866/earrings/7/classics_heart-shaped_diamond_earstuds_esdphs010si_e-2_w2aaff.webp",
//     price: 14000.0,
//     quantity: 20,
//     category: allCategories[1],
//     metals: [{ kind: allMetals[3], caratWeight: null }],
//     stones: [
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 1.0 },
//     ],
//     sizes: [allSizes[0]],
//   });

//   await Jewelry.create({
//     title: "Daytime",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703179269/earrings/8/classics_earrings_diamond_eadpdrmedw_e-1_vptn8c.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703179268/earrings/8/classics_earrings_diamond_eadpdrmedw_e-2_h1edi3.webp",
//     price: 27000.0,
//     quantity: 20,
//     category: allCategories[1],
//     metals: [{ kind: allMetals[3], caratWeight: null }],
//     stones: [
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 6.41 },
//     ],
//     sizes: [allSizes[1]],
//   });

//   await Jewelry.create({
//     title: "Chandelier",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703167483/earrings/1/diamond_chandelier_earrings.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703167483/earrings/1/diamond_chandelier_earrings_eadpchsmct.webp",
//     price: 120000.0,
//     quantity: 20,
//     category: allCategories[1],
//     metals: [{ kind: allMetals[3], caratWeight: null }],
//     stones: [
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 16.81 },
//     ],
//     sizes: [allSizes[2]],
//   });

//   await Jewelry.create({
//     title: "Unforgettable",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703262109/bracelets/8/forget_me_not_bracelet_diamond_and_sapphire_brsprfflrfmn_e_1_bc0a5y.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703262106/bracelets/8/forget_me_not_bracelet_diamond_and_sapphire_brsprfflrfmn_e_2_yli2iv.webp",
//     price: 24000.0,
//     quantity: 20,
//     category: allCategories[0],
//     metals: [{ kind: allMetals[3], caratWeight: null }],
//     stones: [
//       { kind: allStoneTypes[3], color: allStoneColors[2], caratWeight: 4.43 },
//       { kind: allStoneTypes[4], color: allStoneColors[0], caratWeight: 3.22 },
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 4.37 },
//     ],
//     sizes: [allSizes[6], allSizes[7], allSizes[8]],
//   });

//   await Jewelry.create({
//     title: "Lily",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703258159/bracelets/1/lily_cluster_bracelet_diamond_rose_gold_brdrsm1mlc_e-1_csp0lg.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703258156/bracelets/1/lily_cluster_bracelet_diamond_rose_gold_brdrsm1mlc_e-2_zihj3x.webp",
//     price: 32000.0,
//     quantity: 20,
//     category: allCategories[0],
//     metals: [{ kind: allMetals[1], caratWeight: 18 }],
//     stones: [
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 0.31 },
//     ],
//     sizes: [allSizes[6], allSizes[7], allSizes[8]],
//   });

//   await Jewelry.create({
//     title: "Pink Flower",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703259627/bracelets/3/forget_me_not_bracelet_diamond_and_pink_sapphire_brpsprfflrfmn_e_1_h0xaug.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703259630/bracelets/3/forget_me_not_bracelet_diamond_and_pink_sapphire_brpsprfflrfmn_e_2_qlogdk.webp",
//     price: 163000.0,
//     quantity: 20,
//     category: allCategories[0],
//     metals: [{ kind: allMetals[3], caratWeight: null }],
//     stones: [
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 4.37 },
//       { kind: allStoneTypes[4], color: allStoneColors[4], caratWeight: 4.43 },
//     ],
//     sizes: [allSizes[6], allSizes[7], allSizes[8]],
//   });

//   await Jewelry.create({
//     title: "Oval",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703260442/bracelets/4/oval_diamond_bracelet_brdpsfovov_e-1_jon3ta.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703260439/bracelets/4/oval_diamond_bracelet_brdpsfovov_e-2_lowjbd.webp",
//     price: 56000.0,
//     quantity: 20,
//     category: allCategories[0],
//     metals: [{ kind: allMetals[3], caratWeight: null }],
//     stones: [
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 22.09 },
//     ],
//     sizes: [allSizes[6], allSizes[7], allSizes[8]],
//   });

//   await Jewelry.create({
//     title: "Dream",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703261691/bracelets/7/forget-me-not_bracelet_ruby_and_diamond_brrprfflrfmn_e-1_mx30fj.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703261688/bracelets/7/forget-me-not_bracelet_ruby_and_diamond_brrprfflrfmn_e-2_cqsw89.webp",
//     price: 44000.0,
//     quantity: 20,
//     category: allCategories[0],
//     metals: [{ kind: allMetals[3], caratWeight: null }],
//     stones: [
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 4.37 },
//       { kind: allStoneTypes[3], color: allStoneColors[5], caratWeight: 4.43 },
//     ],
//     sizes: [allSizes[6], allSizes[7], allSizes[8]],
//   });

//   await Jewelry.create({
//     title: "Gates",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703265142/bracelets/9/gates_bracelet_diamond_yellow_gold_brdyrd1mwg_e-1_yxkx8q.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703265151/bracelets/9/winston_gates_bracelet_diamond_yellow_gold_brdyrd1mwg_e-2_lo9uge.webp",
//     price: 33000.0,
//     quantity: 20,
//     category: allCategories[0],
//     metals: [{ kind: allMetals[0], caratWeight: 18 }],
//     stones: [
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 4.41 },
//     ],
//     sizes: [allSizes[6], allSizes[7], allSizes[8]],
//   });

//   await Jewelry.create({
//     title: "Flower",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703260723/bracelets/5/diamond_loop_full_motif_diamond_bracelet_brdprp1ml4c_e-1_xioiw0.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703260720/bracelets/5/diamond_loop_full_motif_diamond_bracelet_brdprp1ml4c_e-2_q6cxzy.webp",
//     price: 36000.0,
//     quantity: 20,
//     category: allCategories[0],
//     metals: [{ kind: allMetals[3], caratWeight: null }],
//     stones: [
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 0.29 },
//     ],
//     sizes: [allSizes[6], allSizes[7], allSizes[8]],
//   });

//   await Jewelry.create({
//     title: "Bezel-Set",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703261003/bracelets/6/classics_bezel-set_diamond_bracelet_brdprfsfbz_e-1_bj23kv.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703261006/bracelets/6/classics_bezel-set_diamond_bracelet_brdprfsfbz_e-2_e9age8.webp",
//     price: 55000.0,
//     quantity: 20,
//     category: allCategories[0],
//     metals: [{ kind: allMetals[2], caratWeight: 18 }],
//     stones: [
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 8.27 },
//     ],
//     sizes: [allSizes[6], allSizes[7], allSizes[8]],
//   });

//   await Jewelry.create({
//     title: "Tennis",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703258603/bracelets/2/classics_round_brilliant_diamond_tennis_bracelet_brdpsrp40te_e-1_w4fviy.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703258601/bracelets/2/classics_round_brilliant_diamond_tennis_bracelet_brdpsrp40te_e-2_jth1ky.webp",
//     price: 78000.0,
//     quantity: 20,
//     category: allCategories[0],
//     metals: [{ kind: allMetals[2], caratWeight: 18 }],
//     stones: [
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 14.62 },
//     ],
//     sizes: [allSizes[6], allSizes[7], allSizes[8]],
//   });

//   await Jewelry.create({
//     title: "The Duchess",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703429659/necklaces/9/hj_ra_3_duchess_necklace_a_vowktn.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703429659/necklaces/9/hj_ra_3_duchess_necklace_b_k58hlv.webp",
//     price: 218000.0,
//     quantity: 20,
//     category: allCategories[2],
//     metals: [{ kind: allMetals[3], caratWeight: null }],
//     stones: [
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 14.62 },
//       { kind: allStoneTypes[1], color: allStoneColors[7], caratWeight: 40.11 },
//     ],
//     sizes: [allSizes[3], allSizes[4], allSizes[5]],
//   });

//   await Jewelry.create({
//     title: "Aquamarine",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703428360/necklaces/1/sparkling_cluster_sap_aqua_and_diamond_necklace_nksaqpclrfspc_e-2_gimdwb.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703428360/necklaces/1/sparkling_cluster_sap_aqua_and_diamond_necklace_nksaqpclrfspc_e-1_c2ojj1.webp",
//     price: 63000.0,
//     quantity: 20,
//     category: allCategories[2],
//     metals: [{ kind: allMetals[3], caratWeight: null }],
//     stones: [
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 8.73 },
//       { kind: allStoneTypes[3], color: allStoneColors[2], caratWeight: 4.45 },
//       { kind: allStoneTypes[4], color: allStoneColors[0], caratWeight: 2.8 },
//     ],
//     sizes: [allSizes[3], allSizes[4], allSizes[5]],
//   });

//   await Jewelry.create({
//     title: "Lily",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703429368/necklaces/8/lily_cluster_necklace_diamond_yellow_gold_nkdyrd13mlc_e-2_ow1yxh.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703429367/necklaces/8/lily_cluster_necklace_diamond_yellow_gold_nkdyrd13mlc_e-1_e4er5b.webp",
//     price: 39000.0,
//     quantity: 20,
//     category: allCategories[2],
//     metals: [{ kind: allMetals[0], caratWeight: 18 }],
//     stones: [
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 0.04 },
//     ],
//     sizes: [allSizes[3], allSizes[4], allSizes[5]],
//   });

//   await Jewelry.create({
//     title: "Beautiful Pink Flower",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703270087/necklaces/3/forget_me_not_lariat_necklace_diamond_and_pink_sapphire_nkpspltflrfmn_e_2_fqgnn6.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703270083/necklaces/3/forget_me_not_lariat_necklace_diamond_and_pink_sapphire_nkpspltflrfmn_e_1_zegnl4.webp",
//     price: 97000.0,
//     quantity: 20,
//     category: allCategories[2],
//     metals: [{ kind: allMetals[3], caratWeight: null }],
//     stones: [
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 8.6 },
//       { kind: allStoneTypes[4], color: allStoneColors[4], caratWeight: 8.61 },
//     ],
//     sizes: [allSizes[3], allSizes[4], allSizes[5]],
//   });

//   await Jewelry.create({
//     title: "Multi Color Stone",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703270516/necklaces/4/diamond_loop_pendant_full_motif_multi_color_stone_diamond_pemprpmel4c_e-2_w82uyl.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703270512/necklaces/4/diamond_loop_pendant_full_motif_multi_color_stone_diamond_pemprpmel4c_e-3_hlm1rb.webp",
//     price: 86000.0,
//     quantity: 20,
//     category: allCategories[2],
//     metals: [{ kind: allMetals[3], caratWeight: null }],
//     stones: [
//       { kind: allStoneTypes[4], color: allStoneColors[7], caratWeight: 1.35 },
//       { kind: allStoneTypes[0], color: allStoneColors[1], caratWeight: null },
//       { kind: allStoneTypes[4], color: allStoneColors[4], caratWeight: 1.35 },
//       { kind: allStoneTypes[4], color: allStoneColors[0], caratWeight: 1.35 },
//       { kind: allStoneTypes[1], color: allStoneColors[7], caratWeight: 2.66 },
//     ],
//     sizes: [allSizes[3], allSizes[4], allSizes[5]],
//   });

//   await Jewelry.create({
//     title: "Berry",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703271598/necklaces/6/berry_cluster_pendant_emerald_and_diamond_peepclrfber_e-1_lts2xk.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703271594/necklaces/6/berry_cluster_pendant_emerald_and_diamond_peepclrfber_e-2_u34ipb.webp",
//     price: 63000.0,
//     quantity: 20,
//     category: allCategories[2],
//     metals: [{ kind: allMetals[2], caratWeight: 18 }],
//     stones: [
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 2.01 },
//       { kind: allStoneTypes[2], color: allStoneColors[3], caratWeight: 1.39 },
//     ],
//     sizes: [allSizes[3], allSizes[4], allSizes[5]],
//   });

//   await Jewelry.create({
//     title: "Heart",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703271283/necklaces/5/open_cluster_large_heart_diamond_pendant_pedphslgoc_e-1h_eruvjx.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703271288/necklaces/5/open_cluster_large_heart_diamond_pendant_pedphslgoc_e-2h_oorrck.webp",
//     price: 74000.0,
//     quantity: 20,
//     category: allCategories[2],
//     metals: [{ kind: allMetals[3], caratWeight: null }],
//     stones: [
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 3.9 },
//     ],
//     sizes: [allSizes[3], allSizes[4], allSizes[5]],
//   });

//   await Jewelry.create({
//     title: "Riviere",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703429016/necklaces/7/marquise_riviere_diamond_necklace_nkdpmq003vri_e-2_ia60id.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703429016/necklaces/7/marquise_riviere_diamond_necklace_nkdpmq003vri_e-1_oipabr.webp",
//     price: 43000.0,
//     quantity: 20,
//     category: allCategories[2],
//     metals: [{ kind: allMetals[2], caratWeight: 18 }],
//     stones: [
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 23.25 },
//     ],
//     sizes: [allSizes[3], allSizes[4], allSizes[5]],
//   });

//   await Jewelry.create({
//     title: "Pink Flower",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703269036/necklaces/2/forget_me_not_pendant_diamond_and_pink_sapphire_pepsprfflrfmn_e_1_i09w6i.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703269032/necklaces/2/forget_me_not_pendant_diamond_and_pink_sapphire_pepsprfflrfmn_e_2_b2lu73.webp",
//     price: 52000.0,
//     quantity: 20,
//     category: allCategories[2],
//     metals: [{ kind: allMetals[3], caratWeight: null }],
//     stones: [
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 4.24 },
//       { kind: allStoneTypes[4], color: allStoneColors[4], caratWeight: 4.36 },
//     ],
//     sizes: [allSizes[3], allSizes[4], allSizes[5]],
//   });

//   await Jewelry.create({
//     title: "Cushion-Cut",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703433929/rings/1/cushion_cut_engagement_ring_yellow_diamond_rgyedgcu015mic_e-1_ghcqyq.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703433928/rings/1/cushion_cut_engagement_ring_yellow_diamond_rgyedgcu015mic_e-2_lea4hu.webp",
//     price: 53000.0,
//     quantity: 20,
//     category: allCategories[3],
//     metals: [{ kind: allMetals[3], caratWeight: null }],
//     stones: [
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 0.36 },
//       { kind: allStoneTypes[1], color: allStoneColors[7], caratWeight: 0.98 },
//     ],
//     sizes: [allSizes[9], allSizes[10], allSizes[11]],
//   });

//   await Jewelry.create({
//     title: "Sparkling Cluster",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703434446/rings/2/sparkling_cluster_sap_aqua_and_diamond_ring_frsaqpclrfspc_e-1h_znic2h.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703434445/rings/2/sparkling_cluster_sap_aqua_and_diamond_ring_frsaqpclrfspc_e-2h_kmqowy.webp",
//     price: 48000.0,
//     quantity: 20,
//     category: allCategories[3],
//     metals: [{ kind: allMetals[3], caratWeight: null }],
//     stones: [
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 1.19 },
//       { kind: allStoneTypes[3], color: allStoneColors[2], caratWeight: 0.38 },
//       { kind: allStoneTypes[4], color: allStoneColors[0], caratWeight: 1.08 },
//     ],
//     sizes: [allSizes[9], allSizes[10], allSizes[11]],
//   });

//   await Jewelry.create({
//     title: "Pink Flower",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703434808/rings/3/forget_me_not_ring_diamond_and_pink_sapphire_frpsprfflrfmn_e_1_cy6fmu.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703434809/rings/3/forget_me_not_ring_diamond_and_pink_sapphire_frpsprfflrfmn_e_2_r9cunk.webp",
//     price: 33000.0,
//     quantity: 20,
//     category: allCategories[3],
//     metals: [{ kind: allMetals[3], caratWeight: null }],
//     stones: [
//       { kind: allStoneTypes[4], color: allStoneColors[4], caratWeight: 2.22 },
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 0.05 },
//     ],
//     sizes: [allSizes[9], allSizes[10], allSizes[11]],
//   });

//   await Jewelry.create({
//     title: "Ruby",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703435551/rings/4/ruby_and_diamond_ring_ruby_and_diamond_frrmrpddhwf_e-1_w6ovk2.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703435552/rings/4/ruby_and_diamond_ring_ruby_and_diamond_frrmrpddhwf_e-2_sas5gh.webp",
//     price: 36000.0,
//     quantity: 20,
//     category: allCategories[3],
//     metals: [
//       { kind: allMetals[3], caratWeight: null },
//       { kind: allMetals[0], caratWeight: 18 },
//     ],
//     stones: [
//       { kind: allStoneTypes[3], color: allStoneColors[5], caratWeight: 1.32 },
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 3.29 },
//     ],
//     sizes: [allSizes[9], allSizes[10], allSizes[11]],
//   });

//   await Jewelry.create({
//     title: "Clssic",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703435818/rings/5/classic_engagement_ring_emerald_rgemec020tb_e-1_remfd3.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703435820/rings/5/classic_engagement_ring_emerald_rgemec020tb_e-2_qqna1u.webp",
//     price: 52000.0,
//     quantity: 20,
//     category: allCategories[3],
//     metals: [
//       { kind: allMetals[3], caratWeight: null },
//       { kind: allMetals[0], caratWeight: 18 },
//     ],
//     stones: [
//       { kind: allStoneTypes[2], color: allStoneColors[3], caratWeight: 2.32 },
//     ],
//     sizes: [allSizes[9], allSizes[10], allSizes[11]],
//   });

//   await Jewelry.create({
//     title: "Lily",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703437558/rings/6/lily_cluster_ring_diamond_rose_gold_frdrmqrflc_e-1_sap3ct.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703437556/rings/6/lily_cluster_ring_diamond_rose_gold_frdrmqrflc_e-2_i3qn33.webp",
//     price: 23000.0,
//     quantity: 20,
//     category: allCategories[3],
//     metals: [{ kind: allMetals[1], caratWeight: 18 }],
//     stones: [
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 0.41 },
//     ],
//     sizes: [allSizes[9], allSizes[10], allSizes[11]],
//   });

//   await Jewelry.create({
//     title: "Sunflower",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703436504/rings/7/sunflower_ring_diamond_frdptw007sf_e-1_poiqqc.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703436502/rings/7/sunflower_ring_diamond_frdptw007sf_e-2_grj12r.webp",
//     price: 57000.0,
//     quantity: 20,
//     category: allCategories[3],
//     metals: [{ kind: allMetals[2], caratWeight: 18 }],
//     stones: [
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 0.31 },
//     ],
//     sizes: [allSizes[9], allSizes[10], allSizes[11]],
//   });

//   await Jewelry.create({
//     title: "Heart",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703436707/rings/8/classic_winston_engagement_ring_diamond_rgdphs010tb_e-1_ew1irj.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703436707/rings/8/classic_winston_engagement_ring_diamond_rgdphs010tb_e-1_ew1irj.webp",
//     price: 29000.0,
//     quantity: 20,
//     category: allCategories[3],
//     metals: [{ kind: allMetals[2], caratWeight: 18 }],
//     stones: [
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 0.34 },
//     ],
//     sizes: [allSizes[9], allSizes[10], allSizes[11]],
//   });

//   await Jewelry.create({
//     title: "Bridal Couture",
//     firstImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703436882/rings/9/bridal_couture_by_harry_winston_engagement_ring_emerald_cut_diamond_platinum_rgdpec050ub7_550070_e_1_zgzgx4.webp",
//     secondImageUrl:
//       "https://res.cloudinary.com/deztgvefu/image/upload/v1703436854/rings/9/bridal_couture_by_harry_winston_engagement_ring_emerald_cut_diamond_platinum_rgdpec050ub7_550070_e_2_ovqn8e.webp",
//     price: 46000.0,
//     quantity: 20,
//     category: allCategories[3],
//     metals: [{ kind: allMetals[2], caratWeight: 18 }],
//     stones: [
//       { kind: allStoneTypes[1], color: allStoneColors[6], caratWeight: 0.36 },
//     ],
//     sizes: [allSizes[9], allSizes[10], allSizes[11]],
//   });
// }

// populateDb();
