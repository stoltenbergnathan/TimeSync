const express = require("express");
const postRouter = express.Router();
const User = require("../db/schemas/User");
const PostDetails = require("../db/schemas/PostDetails");
const ActivityDetails = require("../db/schemas/ActivityDetails");
require("dotenv").config();
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
require("dotenv").config();

postRouter.use(express.json());
postRouter.use(express.urlencoded({ extended: false }));
postRouter.use(passport.initialize());
postRouter.use(passport.session());
postRouter.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "ACCEPT", "DELETE"],
    credentials: true,
  })
);

postRouter.post("/PostEvent", (req, res) => {
  console.log(req.body);
  const eventTitle = req.body.title;
  const eventGenre = req.body.genre;
  const eventDateTime = req.body.dateTime;
  const imageUrl = req.body.image;
  const eventUrl = req.body.url;
  const visability = req.body.visability;
  const post = new PostDetails({
    username: req.session.passport.user,
    title: eventTitle,
    genre: eventGenre,
    dateTime: eventDateTime,
    eventUrl: eventUrl,
    imageUrl: imageUrl,
    visability: visability,
  });
  post
    .save()
    .then((savedDoc) => {
      savedDoc === PostDetails;
      console.log(savedDoc);
      res.sendStatus(200);
    })
    .catch((err) => console.log(err));
});

postRouter.get("/AreaFeed", (req, res) => {
  PostDetails.find({ visability: "Public" })
    .then((data1) => {
      ActivityDetails.find({ visability: "Public" })
        .then((data) => {
          res.json(data.concat(data1));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

postRouter.post("/PostComment", (req, res) => {
  console.log(req.body);
  if (req.body.kind !== "Event") {
    ActivityDetails.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      { $push: { comments: req.body.comment } }
    )
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  } else {
    PostDetails.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      { $push: { comments: req.body.comment } }
    )
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }
});

postRouter.post("/PersonalFeed", (req, res) => {
  console.log(req.body.friends);
  PostDetails.find({
    username: { $in: req.body.friends },
  })
    .then((data1) => {
      ActivityDetails.find({ username: { $in: req.body.friends } })
        .then((data) => {
          res.json(data.concat(data1));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

postRouter.delete("/DeletePost", (req, res) => {
  const eventTitle = req.body.title;
  const eventGenre = req.body.genre;
  const eventDateTime = req.body.dateTime;
  const imageUrl = req.body.image;
  const eventUrl = req.body.url;
  PostDetails.deleteOne({
    username: req.session.passport.user,
    title: eventTitle,
    genre: eventGenre,
    dateTime: eventDateTime,
    eventUrl: eventUrl,
    imageUrl: imageUrl,
  })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
});

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
module.exports = postRouter;
