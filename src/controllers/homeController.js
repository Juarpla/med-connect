exports.root = (req, res) => {
  //#swagger.tags=["Home"]
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : "Logged Out",
  );
};
