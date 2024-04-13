const router = require("express").Router();

const homeController = require("./controllers/homeController");
const jewelryController = require("./controllers/jewelryController");
const userController = require("./controllers/userController");
const profileController = require("./controllers/profileController");
const completeOrderController = require("./controllers/completeOrderController");
const completeTransactionController = require("./controllers/completeTransactionController");
const bagController = require("./controllers/bagController");


router.use(homeController);
router.use("/jewelries", jewelryController);
router.use("/users", userController);
router.use("/profiles", profileController);
router.use("/bag", bagController);
router.use("/complete-order", completeOrderController);
router.use("/complete-transaction", completeTransactionController);

router.get("*", (req, res) => {
    res.render("500");
});

// router.get("*", (req, res) => {
//   res.redirect("/404");
// });

module.exports = router;
