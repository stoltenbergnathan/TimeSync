const express = require("express");
const syncsRouter = express.Router();
require("dotenv").config();
const cors = require("cors");
const passport = require("passport");
const Sync = require("../db/schemas/Syncs");
const mongoose = require("mongoose");

syncsRouter.use(express.json());
syncsRouter.use(express.urlencoded({ extended: false }));
syncsRouter.use(passport.initialize());
syncsRouter.use(passport.session());
syncsRouter.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "DELETE"],
    credentials: true,
  })
);

syncsRouter.post("/saveSync", (req, res) => {
  console.log(req.body);
  Sync.findOneAndUpdate(
    {
      username: req.session.passport.user,
    },
    {
      $push: {
        syncs: {
          key: mongoose.Types.ObjectId(),
          type: req.body.stype,
          sync: req.body.obj,
        },
      },
    },
    { upsert: true }
  )
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});

syncsRouter.get("/Syncs", (req, res) => {
  Sync.findOne({ username: req.session.passport.user })
    .then((data) => {
      if (data) {
        console.log(data);
        res.send(data.syncs);
      } else res.send([]);
    })
    .catch((err) => console.log(err));
});

syncsRouter.delete("/Sync", (req, res) => {
  Sync.findOneAndUpdate(
    { username: req.session.passport.user },
    { $pull: { syncs: { key: new mongoose.Types.ObjectId(req.body.key) } } }
  )
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});

module.exports = syncsRouter;
