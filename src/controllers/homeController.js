exports.root = (req, res) => {
  //#swagger.tags=["Home"]
  //#swagger.summary = "Shows the user login status"
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : "Logged Out",
  );
};
