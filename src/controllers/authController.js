exports.login = (req, res) => {
  //#swagger.ignore = true
};

exports.thirdPartyAuth = (req, res) => {
  //#swagger.ignore = true
  req.session.user = req.user;
  res.redirect("/");
};

exports.logout = (req, res) => {
  // Implement logout logic
};
