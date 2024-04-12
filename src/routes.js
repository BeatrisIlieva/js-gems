const router = require("express").Router();

const homeController = require("./controllers/homeController");
const jewelryController = require("./controllers/jewelryController");
const userController = require("./controllers/userController");
const profileController = require("./controllers/profileController");
const addToBagController = require("./controllers/addToBagController");
const displayBagController = require("./controllers/displayBagController");
const completeOrderController = require("./controllers/completeOrderController");


router.use(homeController);
router.use("/jewelries", jewelryController);
router.use("/users", userController);
router.use("/profiles", profileController);
router.use("/add-to-bag", addToBagController);
router.use("/display-bag", displayBagController);
router.use("/complete-order", completeOrderController);

router.get("*", (req, res) => {
    res.render("500");
});

// router.get("*", (req, res) => {
//   res.redirect("/404");
// });

module.exports = router;
