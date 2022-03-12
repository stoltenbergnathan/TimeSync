const express = require("express");
const friendsRouter = express.Router();
const User = require("../db/schemas/User");
const FriendInfo = require("../db/schemas/FriendInfo");
require("dotenv").config();
const cors = require("cors");
const passport = require("passport");

friendsRouter.use(express.json());
friendsRouter.use(express.urlencoded({ extended: false }));
friendsRouter.use(passport.initialize());
friendsRouter.use(passport.session());
friendsRouter.use(
  cors({
    origin: "https://www.timesync.one",
    methods: ["POST", "PUT", "GET", "OPTIONS", "ACCEPT", "DELETE"],
    credentials: true,
  })
);

friendsRouter.post("/FriendRequest", (req, res) => {
  FriendInfo.findOneAndUpdate(
    { username: req.body.user },
    { $addToSet: { requests: req.session.passport.user } }
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

friendsRouter.post("/AcceptFriendRequests", (req, res) => {
  const newFriend = req.body.friend;
  FriendInfo.findOneAndUpdate(
    { username: req.session.passport.user },
    {
      $addToSet: { friendList: newFriend },
      $pull: { requests: newFriend },
    }
  )
    .then((data) => {
      console.log(data);
      FriendInfo.findOneAndUpdate(
        { username: newFriend },
        {
          $addToSet: { friendList: req.session.passport.user },
          $pull: { requests: req.session.passport.user },
        }
      )
        .then((data) => {
          console.log(data);
          res.sendStatus(200);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

friendsRouter.get("/friends", (req, res) => {
  FriendInfo.findOne({ username: req.session.passport.user })
    .then((data) => {
      res.json(data.friendList);
    })
    .catch((err) => console.log(err));
});

friendsRouter.delete("/friends", (req, res) => {
  const deletedUser = req.body.user;
  FriendInfo.findOneAndUpdate(
    { username: req.session.passport.user },
    { $pull: { friendList: deletedUser } }
  )
    .then((data) => {
      console.log(data);
      FriendInfo.findOneAndUpdate(
        { username: deletedUser },
        { $pull: { friendList: req.session.passport.user } }
      )
        .then((data) => {
          console.log(data);
          res.sendStatus(200);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
module.exports = friendsRouter;
