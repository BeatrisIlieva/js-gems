const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleware");
const { DEFAULT_ADD_QUANTITY } = require("../constants/shoppingBag");

const addToBagManager = require("../managers/addToBagManager");

router.post("/:jewelryId", isAuth, async (req, res) => {
  const user = req.user._id;

  const jewelry = req.params.jewelryId;

  const { size } = req.body;

  try {
    await addToBagManager.createOrUpdate({
      user,
      jewelry,
      size,
      quantity: DEFAULT_ADD_QUANTITY,
    });
  
    res.redirect(`/display-bag/${userId}`);
  } catch(err) {
    res.render('500');
  }
});

module.exports = router;
