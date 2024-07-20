const session = require("express-session");
const cors = require("cors");
const GitHubStrategy = require("passport-github2").Strategy;
require("dotenv").config();

const authHelper = {};

authHelper.session = session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
});

authHelper.corsConfig = cors({
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  origin: "*",
});

authHelper.gitHubStrategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
  },
  function (accessToken, refreshToken, profile, done) {
    //User.findOrCreate({ githubId: profile.id }, function name(err, user) {
    return done(null, profile);
    //});
  },
);

authHelper.failureObject = {
  failureRedirect: `/api-docs`,
  session: false,
};

module.exports = authHelper;
