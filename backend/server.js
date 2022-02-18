const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 80;
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const psswd = require("./lib/passwordFucntions");
const connection = require("./db/connection/Connect");
const User = require("./db/schemas/User");

async function makeAPIcall(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

app.get("/api/personal", (req, res) => {
  let query = req.query;
  console.log(query);
  let url = "https://www.boredapi.com/api/activity?";
  for (const key in query) {
    url = url.concat(`${key}=${query[key]}&`);
  }
  console.log(`Making GET request to ${url}`);
  const promise = makeAPIcall(url);
  promise.then((data) => {
    res.send(data);
  });
});

app.post("/user", (req, res) => {
  User.find({
    $or: [{ username: req.query.username }, { email: req.query.email }],
  }).then((Existsresult) => {
    console.log(Existsresult);
    if (Existsresult.length === 0) {
      saltHash = psswd.generatePassword(req.query.password);
      const newUser = User({
        username: req.query.username,
        email: req.query.email,
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

connection.on("connected", () => {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
});
