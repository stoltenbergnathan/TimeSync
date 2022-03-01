const express = require("express");
const userRouter = express.Router();
const User = require("../db/schemas/User");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
require("dotenv").config();
const cors = require("cors");
userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: false }));

passport.use(new LocalStrategy(User.authenticate()));
userRouter.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
userRouter.use(passport.initialize());
userRouter.use(passport.session());
userRouter.use(cors());

userRouter.post("/register", (req, res) => {
  console.log(`Register call for ${req.body.username}`);
  User.register(
    new User({ username: req.body.username, email: req.body.email }),
    req.body.password,
    (err, user) => {
      if (err) {
        return res.json(err);
      }
      passport.authenticate("local")(req, res, () => {
        req.login(user._id, (err) => {
          res.json({ message: "success" });
        });
      });
    }
  );
});

userRouter.post("/login", passport.authenticate("local"), (req, res) => {
  res.send("Authorized");
});

userRouter.get("/isAuth", (req, res) => {
  res.json({ auth: req.isAuthenticated() });
});

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = userRouter;
