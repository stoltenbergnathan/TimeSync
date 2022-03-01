const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 80;
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const connection = require("./db/connection/Connect");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const session = require("express-session");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRoutes);
app.use(cors());

app.get("/", (req, res) => {
  res.json({ user: req.user, auth: req.isAuthenticated() });
});

app.get("/api/personal", (req, res) => {
  let query = req.query;
  console.log(query);
  let url = "https://www.boredapi.com/api/activity?";
  for (const key in query) {
    if (key === "type" && query[key] !== "any")
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

app.get("/api/youtube/:activity", (req, res) => {
  let activity = req.params.activity;
  console.log(`Fetching videos for ${activity} tutorials`);
  let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${activity} tutorial&key=${process.env.YT_KEY}`;
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
