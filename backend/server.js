const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 80;
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const mongoose = require("mongoose");
const connectionString = process.env.ATLAS_URI;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
  })
  .catch((error) => console.log(error));

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected to DB successfully");
});

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

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
