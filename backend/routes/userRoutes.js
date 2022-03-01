const express = require("express");
const userRouter = express.Router();
const User = require("../db/schemas/User");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
require("dotenv").config();

passport.use(new LocalStrategy(User.authenticate()));
const oneHour = 1000 * 60 * 60;
userRouter.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: oneHour },
  })
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

userRouter.post("/register", (req, res) => {
  User.register(
    new User({ username: req.body.username, email: req.body.email }),
    req.body.password,
    (err, user) => {
      if (err) {
        return res.json(err);
      }
      passport.authenticate("local")(req, res, () => {
        res.json(user);
      });
    }
  );
});

userRouter.post("/login", passport.authenticate("local"), (req, res) => {
  res.send("Authorized");
});

module.exports = userRouter;
