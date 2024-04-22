const ShoppingBag = require("../models/ShoppingBag");
const Jewelry = require("../models/Jewelry");
const Inventory = require("../models/Inventory");
const { DEFAULT_MIN_QUANTITY } = require("../constants/shoppingBag");
const User = require("../models/User");

const getOne = async ({userId, jewelryId, sizeId}) => {
  const bagItem = await ShoppingBag.findOne({
    user: userId,
    jewelry: jewelryId,
    size: sizeId,
  });

  return bagItem;
};

exports.create = async ({
  userId,
  jewelryId,
  sizeId,
  quantity: DEFAULT_ADD_QUANTITY,
}) => {

  bagItem = await ShoppingBag.create({
    user: userId,
    jewelry: jewelryId,
    size: sizeId,
    quantity: DEFAULT_ADD_QUANTITY,
  });

  await Inventory.findOneAndUpdate({jewelry: jewelryId, size: sizeId}, { $inc: { quantity: -1 } }, { new: true } );

};


exports.update = async ({bagItemId, updatedQuantity}) => {
  const bagItem = await ShoppingBag.findById(bagItemId);

  const jewelryId = bagItem.jewelry.toString();

  const jewelry = await Jewelry.findById(jewelryId);

  alreadyAddedQuantity = bagItem.quantity;

  availableQuantity = jewelry.quantity + alreadyAddedQuantity;

  if (updatedQuantity < DEFAULT_MIN_QUANTITY) {
    throw new Error("Quantity must be greater than zero");
  } else if (updatedQuantity > availableQuantity) {
    throw new Error(
      `Please choose quantity between ${DEFAULT_MIN_QUANTITY} and ${availableQuantity}`
    );
  } else {
    await bagItem.updateOne({ quantity: updatedQuantity});

    if (alreadyAddedQuantity < updatedQuantity) {
      difference = updatedQuantity - alreadyAddedQuantity;
      newQuantity = jewelry.quantity - difference;
    } else {
      difference = alreadyAddedQuantity - updatedQuantity;
      newQuantity = jewelry.quantity + difference;
    }
    await jewelry.updateOne({ quantity: newQuantity });

    if (Number(updatedQuantity) === 0) {
      await bagItem.deleteOne();
    }
  }
};


exports.getAll = async (userId) => {
  user = await User.findById(userId);

  let jewelries =  await ShoppingBag.aggregate([
    {
      $match: {
        user: user._id,
      },
    },
    {
      $lookup: {
        as: "jewelries",
        from: "jewelries",
        foreignField: "_id",
        localField: "jewelry",
      },
    },
    {
      $unwind: "$jewelries",
    },
    {
      $lookup: {
        as: "jewelrymetals",
        from: "jewelrymetals",
        foreignField: "jewelry",
        localField: "jewelries._id",
      },
    },
    {
      $unwind: "$jewelrymetals",
    },
    {
      $lookup: {
        as: "metals",
        from: "metals",
        foreignField: "_id",
        localField: "jewelrymetals.metal",
      },
    },
    {
      $unwind: "$metals",
    },
    {
      $lookup: {
        as: "jewelrystones",
        from: "jewelrystones",
        foreignField: "jewelry",
        localField: "jewelries._id",
      },
    },
    {
      $unwind: "$jewelrystones",
    },
    {
      $lookup: {
        as: "stonetypes",
        from: "stonetypes",
        foreignField: "_id",
        localField: "jewelrystones.stoneType",
      },
    },
    {
      $unwind: "$stonetypes",
    },
    {
      $lookup: {
        as: "stonecolors",
        from: "stonecolors",
        foreignField: "_id",
        localField: "jewelrystones.stoneColor",
      },
    },
    {
      $unwind: "$stonecolors",
    },
    {
      $lookup: {
        as: "categories",
        from: "categories",
        foreignField: "_id",
        localField: "jewelries.category",
      },
    },
    {
      $lookup: {
        as: "inventories",
        from: "inventories",
        foreignField: "jewelry",
        localField: "jewelry",
      },
    },
    {
      $lookup: {
        as: "sizes",
        from: "sizes",
        foreignField: "_id",
        localField: "size",
      },
    },
    {
      $unwind: "$inventories",
    },
  
    {
      $unwind: "$sizes",
    },
    {
      $unwind: "$categories",
    },
  
    {
      $addFields: {
        totalPrice: {
          $multiply: [
            "$inventories.price",
            "$quantity",
          ],
        },
        minQuantity: 0,
        maxQuantity: {
          $sum: [
            "$inventories.quantity",
            "$quantity",
          ],
        },
      },
    },
    {
      $addFields: {
        metalInfo: {
          $map: {
            input: [
              {
                metal: "$metals",
                caratWeight:
                  "$jewelrymetals.caratWeight",
              },
            ],
            as: "jm",
            in: {
              metal: "$$jm.metal.title",
              caratWeight: "$$jm.caratWeight",
            },
          },
        },
      },
    },
    {
      $addFields: {
        stoneInfo: {
          $map: {
            input: [
              {
                stoneType: "$stonetypes",
                stoneColor: "$stonecolors",
                caratWeight:
                  "$jewelrystones.caratWeight",
              },
            ],
            as: "js",
            in: {
              stoneType: "$$js.stoneType.title",
              stoneColor: "$$js.stoneColor.title",
              caratWeight: "$$js.caratWeight",
            },
          },
        },
      },
    },
    {
      $addFields: {
        jewelryId: "$jewelries._id",
      },
    },
    {
      $addFields: {
        sizeId: "$sizes._id",
      },
    },
    {
      $group: {
        _id: "$_id",
        jewelryId: { $first: "$jewelryId" },
        user: { $first: "$user" },
        jewelryTitle: {
          $first: "$jewelries.title",
        },
        firstImageUrl: {
          $first: "$jewelries.firstImageUrl",
        },
        categoryTitle: {
          $first: "$categories.title",
        },
        size: { $first: "$sizes.measurement" },
        sizeId: { $first: "$sizeId" },
        metalInfo: {
          $addToSet: "$metalInfo",
        },
        stoneInfo: {
          $addToSet: "$stoneInfo",
        },
        quantity: { $first: "$quantity" },
        maxQuantity: { $first: "$maxQuantity" },
        minQuantity: { $first: "$minQuantity" },
        totalPrice: { $first: "$totalPrice" },
        createdAt: { $first: "$createdAt" },
      },
    },
      {
      $sort: {
        createdAt: -1, 
      },
    },
    {
      $project: {
        user: 1,
        jewelryId: 1,
        jewelryTitle: 1,
        categoryTitle: 1,
        title: 1,
        firstImageUrl: 1,
        size: 1,
        sizeId: 1,
        metalInfo: 1,
        stoneInfo: 1,
        quantity: 1,
        maxQuantity: 1,
        minQuantity: 1,
        totalPrice: 1,
      },
    },
    {
      $group: {
        _id: null, 
        documents: {
          $push: "$$ROOT", 
        },
        totalTotalPrice: { $sum: "$totalPrice" }, 
      },
    },
    {
      $project: {
        documents: 1,
        totalTotalPrice: 1,
      },
    },
  ]);

  return jewelries;
};






// exports.getAll = async (userId) => {
//   const result = await ShoppingBag.find({ user: userId });

//   const bagItems = {};

//   let subTotal = 0;

//   for (let i = 0; i < result.length; i++) {
//     const jewelryId = result[i].jewelry;
//     const bagItemId = result[i]._id;

//     const jewelry = await Jewelry.findById(jewelryId)
//       .populate("category")
//       .populate("metals.kind")
//       .populate("metals.caratWeight")
//       .populate("stones.kind")
//       .populate("stones.color")
//       .populate("stones.caratWeight")
//       .lean();
//     const sizeId = result[i].size;
//     const size = await Size.findById(sizeId).populate("measurement").lean();
//     const quantity = result[i].quantity;
//     const totalPrice = result[i].totalPrice;
//     const maxQuantity = jewelry.quantity + quantity;
//     bagItems[bagItemId] = {
//       bagItemId,
//       jewelry: jewelry,
//       size: size,
//       quantity: quantity,
//       totalPrice: totalPrice,
//       maxQuantity: maxQuantity,
//       minQuantity: DEFAULT_MIN_QUANTITY,
//     };
//     subTotal += totalPrice;
//   }

//   return { bagItems, subTotal };
// };


// const updateBagTotalPrice = async ({userId, jewelryId, sizeId}) => {
//   const bagItem = await getOne({ userId, jewelryId, sizeId });
//   const bagItemQuantity = bagItem.quantity;
//   const inventory = await Inventory.findOne({jewelry: jewelryId, size: sizeId});
//   const jewelryPrice = inventory.price;


//   const totalPrice = bagItemQuantity * jewelryPrice;

//   bagItem.totalPrice = totalPrice;
//   await bagItem.save();
// }

exports.getOne = getOne;

