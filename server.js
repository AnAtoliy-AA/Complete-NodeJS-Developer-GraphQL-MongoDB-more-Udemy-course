const fs = require("fs");
const https = require("https");
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const passport = require("passport");

const { Strategy } = require("passport-google-oauth20");

require("dotenv").config();

const PORT = 3000;

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
};

const callbackURL = "/auth/google/callback";

const AUTH_OPTIONS = {
  callbackURL,
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log("Google profile", profile);

  done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

const app = express();

app.use(helmet());

app.use(passport.initialize());

function checkLoggedIn(req, res, next) {
  const isLoggedIn = true; //TODO

  if (!isLoggedIn) {
    return res.status(401).json({
      error: "Not logged in!",
    });
  }

  next();
}

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email"],
  }),
  (req, res) => {}
);

app.get(
  callbackURL,
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: false,
  }),
  (req, res) => {
    console.log("Google called us back!");
  }
);

app.get("/auth/logout", (req, res) => {});

app.get("/secret", checkLoggedIn, (req, res) => {
  return res.send("Your secret value is 42~!");
});

app.get("/failure", (req, res) => {
  return res.send("Failed to log in!");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
