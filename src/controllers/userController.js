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
const { isAuth } = require("../middlewares/authMiddleware");

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

    const redirectTo = req.session.originalUrl || "/";
    delete req.session.originalUrl;
    res.redirect(redirectTo);
  } catch (err) {
    const errorMessages = extractErrorMessages(err);

    res.status(404).render("users/register", { errorMessages, email });
  }
});

router.post("/change-email", isAuth, async (req, res) => {
  const { email, password } = req.body;
  userId = req.user._id;

  try {
    await userManager.changeEmail(email, password, userId);

    req.flash("success", "Email updated successfully!");

    res.redirect("/profiles/edit");
  } catch (err) {
    const errorMessages = extractErrorMessages(err);

    res.status(404).render("profiles/edit", { errorMessages, email });
  }
});

router.post("/change-password", isAuth, async (req, res) => {
  const { oldPassword, password, repeatPassword } = req.body;
  userId = req.user._id;

  try {
    await userManager.changePassword(
      oldPassword,
      password,
      repeatPassword,
      userId
    );

    req.flash("success", "Password updated successfully!");

    res.redirect("/profiles/edit");
  } catch (err) {
    const errorMessages = extractErrorMessages(err);

    res.status(404).render("profiles/edit", { errorMessages, email });
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

    const redirectTo = req.session.originalUrl || "/";
    delete req.session.originalUrl;
    res.redirect(redirectTo);
  } catch (err) {
    const errorMessages = extractErrorMessages(err);
    res.status(404).render("users/login", { errorMessages });
  }
});

router.get("/logout", isAuth, (req, res) => {
  res.clearCookie(TOKEN_KEY);
  res.redirect("/users/login");
});

router.get(
  "/delete-confirmation",
  isAuth,
  getBagCount,
  getLikeCount,
  async (req, res) => {
    try {
      res.render("users/deleteConfirmation");
    } catch (err) {
      res.redirect("/", { error: "Unsuccessful deletion!" });
    }
  }
);

router.get("/delete", isAuth, getBagCount, getLikeCount, async (req, res) => {
  try {
    userId = req.user._id;
    await userManager.delete(userId);
    res.clearCookie(TOKEN_KEY);
    res.redirect("/users/register");
  } catch (err) {
    res.redirect("/", { error: "Unsuccessful deletion!" });
  }
});

module.exports = router;
