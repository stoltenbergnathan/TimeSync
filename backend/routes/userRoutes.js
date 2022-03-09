const express = require("express");
const userRouter = express.Router();
const User = require("../db/schemas/User");
const FriendInfo = require("../db/schemas/FriendInfo");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
require("dotenv").config();
const cors = require("cors");
const MongoStore = require("connect-mongo");

userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: false }));

passport.use(new LocalStrategy(User.authenticate()));
userRouter.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.ATLAS_URI }),
  })
);
userRouter.use(passport.initialize());
userRouter.use(passport.session());
userRouter.use(
  cors({
    origin: "http://timesync.one",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
    credentials: true,
  })
);

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
          FriendInfo.create({ username: req.body.username });
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

userRouter.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid").sendStatus(200);
  });
});

userRouter.get("/getCurrentUser", (req, res) => {
  res.json({ user: req.session.passport.user });
});

userRouter.post("/changePassword", (req, res) => {
  req.user.changePassword(req.body.password, req.body.newPassword, (err) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    } else res.sendStatus(200);
  });
});

userRouter.delete("/removeAccount", (req, res) => {
  User.findOneAndDelete({ username: req.session.passport.user })
    .then((data) => {
      console.log(data);
      FriendInfo.findOneAndDelete({ username: req.session.passport.user }).then(
        () => {
          req.session.destroy(() => {
            res.clearCookie("connect.sid").sendStatus(200);
          });
        }
      );
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = userRouter;
