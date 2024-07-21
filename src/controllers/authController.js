exports.login = (req, res) => {
  //#swagger.ignore = true
};

exports.thirdPartyAuth = (req, res) => {
  //#swagger.ignore = true
  req.session.user = req.user;
  res.redirect("/");
};

exports.logout = (req, res, next) => {
  // #swagger.tags=["Auth"]
  // #swagger.summary = "Logout a user"
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
