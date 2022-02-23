const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 80;
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const connection = require("./db/connection/Connect");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const { response } = require("express");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRoutes);

app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

app.get("/api/personal", cors(), (req, res) => {
  let query = req.query;
  console.log(query);
  let url = "https://www.boredapi.com/api/activity?";
  for (const key in query) {
    url = url.concat(`${key}=${query[key]}&`);
  }
  console.log(`Making GET request to ${url}`);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
});

app.get("/api/youtube/:activity", cors(), (req, res) => {
  let activity = req.params.activity;
  console.log(`Fetching videos for ${activity} tutorials`);
  let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${activity} tutorial&key=${process.env.YT_KEY}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});

connection.on("connected", () => {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
});
