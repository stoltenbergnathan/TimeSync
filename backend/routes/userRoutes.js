const express = require("express");
const userRouter = express.Router();
const User = require("../db/schemas/User");
const psswd = require("../lib/passwordFucntions");

userRouter.post("/user", (req, res) => {
  User.find({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  }).then((Existsresult) => {
    console.log(Existsresult);
    if (Existsresult.length === 0) {
      saltHash = psswd.generatePassword(req.body.password);
      const newUser = User({
        username: req.body.username,
        email: req.body.email,
        hash: saltHash.hash,
        salt: saltHash.salt,
      });

      newUser
        .save()
        .then((result) => {
          console.log(`Created user: ${result.username}`);
          res.send(`Created user: ${result.username}`);
        })
        .catch((err) => console.log(err));
    } else {
      res.send("User Exists");
    }
  });
});

userRouter.get("/user/:name", (req, res) => {
  User.find({ username: req.params.name })
    .then((results) => res.json(results))
    .catch((err) => console.log(err));
});

userRouter.delete("/user/:name", (req, res) => {
  User.findOneAndDelete({ username: req.params.name })
    .then((results) => res.json(results))
    .catch((err) => console.log(err));
});

module.exports = userRouter;
