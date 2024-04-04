const router = require("express").Router();

const homeController = require("./controllers/homeController");
const earringController = require("./controllers/earringController");

router.use(homeController);
router.use("/earrings", earringController);
router.get("*", (req, res) => {
  res.redirect("/404");
});

module.exports = router;
