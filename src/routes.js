const router = require("express").Router();

const homeController = require("./controllers/homeController");
const earringController = require("./controllers/earringController");
const userController = require("./controllers/userController");
const shoppingBagController = require("./controllers/shoppingBagController");

router.use(homeController);
router.use("/earrings", earringController);
router.use("/users", userController);
router.use("/shopping-bag", shoppingBagController);

router.get("*", (req, res) => {
  res.redirect("/404");
});

module.exports = router;
