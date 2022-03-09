const express = require("express");
const ActivityRouter = express.Router();
const User = require("../db/schemas/User");
const ActivityDetails = require("../db/schemas/ActivityDetails");
require("dotenv").config();
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
require("dotenv").config();

ActivityRouter.use(express.json());
ActivityRouter.use(express.urlencoded({ extended: false }));
ActivityRouter.use(passport.initialize());
ActivityRouter.use(passport.session());
ActivityRouter.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "DELETE"],
    credentials: true,
  })
);

ActivityRouter.post("/PostActivity", (req, res) => {
  const Title = req.body.title;
  const Genre = req.body.genre;
  const Url = req.body.url;
  const Kind = req.body.kind;
  const post = new ActivityDetails({
    username: req.session.passport.user,
    title: Title,
    genre: Genre,
    Url: Url,
    kind: Kind,
  });
  post
    .save()
    .then((savedDoc) => {
      savedDoc === ActivityDetails;

      res.sendStatus(200);
    })
    .catch((err) => console.log(err));
});

ActivityRouter.get("/ActivityAreaFeed", (req, res) => {
  ActivityDetails.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});
ActivityRouter.get("/ActivityPersonalFeed", (req, res) => {
  ActivityDetails.find({ username: req.session.passport.user })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

ActivityRouter.delete("/DeleteActivity", (req, res) => {
  const Title = req.body.title;
  const Genre = req.body.genre;
  const Url = req.body.url;
  ActivityDetails.deleteOne({
    username: req.session.passport.user,
    title: Title,
    genre: Genre,
    Url: Url,
  })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
});

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
module.exports = ActivityRouter;
