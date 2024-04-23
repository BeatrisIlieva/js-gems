exports.storeOriginalUrl = (req, res, next) => {
  if (
    req.url !== "/users/register" &&
    req.url !== "/users/login" &&
    req.url !== "/css/icons.css" &&
    req.url !== "/users/logout"
  ) {
    req.session.originalUrl = req.originalUrl || req.url;
  }

  next();
};
