const express = require("express");
const userRouter = express.Router();
const User = require("../db/schemas/User");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

userRouter.post("/register", (req, res) => {
  res.send("Register");
});

userRouter.post("/login", (req, res) => {
  res.send("Login");
});

module.exports = userRouter;
