const express = require("express");
const friendsRouter = express.Router();
const User = require("../db/schemas/User");
const FriendInfo = require("../db/schemas/FriendInfo");
require("dotenv").config();
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const LocalStrategy = require("passport-local").Strategy;
require("dotenv").config();

passport.use(new LocalStrategy(User.authenticate()));
friendsRouter.use(express.json());
friendsRouter.use(express.urlencoded({ extended: false }));
friendsRouter.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.ATLAS_URI }),
  })
);
friendsRouter.use(passport.initialize());
friendsRouter.use(passport.session());
friendsRouter.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
    credentials: true,
  })
);

friendsRouter.post("/FriendRequest", (req, res) => {
  FriendInfo.findOneAndUpdate(
    { username: req.body.user },
    { $push: { requests: req.session.passport.user } }
  )
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
});

friendsRouter.get("/FriendRequests", (req, res) => {
  FriendInfo.findOne({ username: req.session.passport.user }).then((data) => {
    if (data) res.json(data.requests);
  });
});

friendsRouter.delete("/FriendRequests", (req, res) => {
  const reject = req.body.reject;
  FriendInfo.findOneAndUpdate(
    { username: req.session.passport.user },
    { $pull: { requests: reject } }
  ).then((data) => res.sendStatus(200));
});

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
module.exports = friendsRouter;
