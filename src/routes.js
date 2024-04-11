const router = require("express").Router();

const homeController = require("./controllers/homeController");
const earringController = require("./controllers/earringController");
const userController = require("./controllers/userController");
const profileController = require("./controllers/profileController");
const addToBagController = require("./controllers/addToBagController");
const displayBagController = require("./controllers/displayBagController");


router.use(homeController);
router.use("/earrings", earringController);
router.use("/users", userController);
router.use("/profiles", profileController);
router.use("/add-to-bag", addToBagController);
router.use("/display-bag", displayBagController);

router.get("*", (req, res) => {
    res.render("500");
});

// router.get("*", (req, res) => {
//   res.redirect("/404");
// });

module.exports = router;
