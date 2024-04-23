const router = require("express").Router();
const userManager = require("../managers/userManager");
const { extractErrorMessages } = require("../utils/errorHelpers");
const { TOKEN_KEY } = require("../config/config");
const { getBagCount } = require("../middlewares/bagCounterMiddleware");
const { getLikeCount } = require("../middlewares/likeCounterMiddleware");
const {
  transferSessionWishlistToModelWishlist,
} = require("../utils/transferSessionWishlistToModelWishlist");
const {
  transferSessionBagsToModelShoppingBag,
} = require("../utils/transferSessionBagsToModelShoppingBag");

router.get("/register", getBagCount, getLikeCount, (req, res) => {
  res.render("users/register");
});

router.post("/register", async (req, res) => {
  const { email, password, repeatPassword } = req.body;

  try {
    const { token, userId } = await userManager.register({
      email,
      password,
      repeatPassword,
    });

    res.cookie(TOKEN_KEY, token);

    const sessionId = req.session.id;

    await transferSessionWishlistToModelWishlist(req, userId);

    await transferSessionBagsToModelShoppingBag(sessionId, userId);

    res.redirect("/");
  } catch (err) {
    const errorMessages = extractErrorMessages(err);

    res.status(404).render("users/register", { errorMessages, email });
  }
});

router.get("/login", getBagCount, getLikeCount, async (req, res) => {
  res.render("users/login");
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const { token, user } = await userManager.login(email, password);

    console.log(user);

    const sessionId = req.session.id;

    const userId = user._id;

    await transferSessionWishlistToModelWishlist(req, userId);

    await transferSessionBagsToModelShoppingBag(sessionId, userId);

    res.cookie(TOKEN_KEY, token, { httpOnly: true });

    res.redirect("/");
  } catch (err) {
    const errorMessages = extractErrorMessages(err);
    res.status(404).render("users/login", { errorMessages });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie(TOKEN_KEY);
  res.redirect("/users/login");
});

router.get("/:userId/delete", getBagCount, getLikeCount, async (req, res) => {
  try {
    userId = req.params.userId;
    await userManager.delete(userId);
    res.clearCookie(TOKEN_KEY);
    res.redirect("/users/register");
  } catch (err) {
    res.redirect("/", { error: "Unsuccessful deletion!" });
  }
});

module.exports = router;
