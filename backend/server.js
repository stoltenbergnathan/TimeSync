const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 80;
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const connection = require("./db/connection/Connect");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const friendRoutes = require("./routes/friendsRoutes");
const postRoutes = require("./routes/postRoutes");
const activityRoutes = require("./routes/activityRoutes");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRoutes);
app.use(friendRoutes);
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(postRoutes);
app.use(activityRoutes);
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

app.get("/api/events", (req, res) => {
  let query = req.query;
  let keyword = query.topic;
  let city = query.city;
  console.log(query);
  let url = "";
  if (keyword == "") {
    url = `https://app.ticketmaster.com/discovery/v2/events.json?size=5&city=${city}&apikey=${process.env.TM_KEY}`;
  } else {
    url = `https://app.ticketmaster.com/discovery/v2/events.json?size=5&city=${city}&keyword=${keyword}&apikey=${process.env.TM_KEY}`;
  }
  console.log(`Making GET request to ${url}`);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      eventArray = [];
      for (let i = 0; i < data._embedded.events.length; i++) {
        eventObj = {
          title: data._embedded.events[i].name,
          imageUrl: data._embedded.events[i].images[0].url,
          dateTime: data._embedded.events[i].dates.start,
          eventUrl: data._embedded.events[i].url,
          genre: data._embedded.events[i].classifications[0].genre.name,
        };
        eventArray.push(eventObj);
      }
      res.send(eventArray);
    })
    .catch((err) => {
      console.log("No Data");
      res.send([]);
    });
});

connection.on("connected", () => {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
});
