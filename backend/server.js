const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 80;
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const connection = require("./db/connection/Connect");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRoutes);
app.use(cors());

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
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
});

app.get("/api/youtube/:activity", (req, res) => {
  // let activity = req.params.activity;
  // console.log(`Fetching videos for ${activity} tutorials`);
  // let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${activity} tutorial&key=${process.env.YT_KEY}`;
  // fetch(url)
  //   .then((response) => response.json())
  //   .then((data) => res.send(data))
  //   .catch((err) => console.log(err));
  console.log(req.url);
  res.send({
    items: [
      {
        kind: "youtube#searchResult",
        etag: "ZBwXZTMBS2rmS7RLaJ8PRFKu0eo",
        id: {
          kind: "youtube#video",
          videoId: "IV0SJ5vt3F4",
        },
        snippet: {
          publishedAt: "2022-02-27T00:22:45Z",
          channelId: "UChuLeaTGRcfzo0UjL-2qSbQ",
          title: "WATCH LIVE SLO CAL Open at Morro Bay",
          description:
            "WSL Subscribe to the WSL for more action: https://goo.gl/VllRuj Watch all the latest surfing action of the world's best surfers in the ...",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/IV0SJ5vt3F4/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/IV0SJ5vt3F4/mqdefault.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://i.ytimg.com/vi/IV0SJ5vt3F4/hqdefault.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "World Surf League",
          liveBroadcastContent: "none",
          publishTime: "2022-02-27T00:22:45Z",
        },
      },
      {
        kind: "youtube#searchResult",
        etag: "5e_4VyKSKxS4h4CGzWmOTd_dc80",
        id: {
          kind: "youtube#video",
          videoId: "HB2jZut-Wnc",
        },
        snippet: {
          publishedAt: "2022-01-24T05:28:15Z",
          channelId: "UCVo06dBGK9VBBhq15wJxZHQ",
          title:
            "🔴4k Pipeline Surf - 1/21/22 - Does it Get Much Better Then This??🆕",
          description:
            "Filmed at Banzai Pipeline, Oahu on January 21st, 2022 by Andy Potts and Jr Maosi Let me know what you thought of today's ...",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/HB2jZut-Wnc/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/HB2jZut-Wnc/mqdefault.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://i.ytimg.com/vi/HB2jZut-Wnc/hqdefault.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "Chris Kincade Media - Waves of the World ",
          liveBroadcastContent: "none",
          publishTime: "2022-01-24T05:28:15Z",
        },
      },
      {
        kind: "youtube#searchResult",
        etag: "3b0uAJv_I_QOfYbqUs7R4cryzLU",
        id: {
          kind: "youtube#video",
          videoId: "ma67yOdMQfs",
        },
        snippet: {
          publishedAt: "2021-01-23T17:00:15Z",
          channelId: "UC--3c8RqSfAqYBdDjIG3UNA",
          title:
            "These Were The All-Time Surfing Moments Of The Year | Best Of 2020",
          description:
            "Well, that was a weird ride. Though it hasn't been easy, at least when we fixed our gaze on the ocean — or favorite place in the ...",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/ma67yOdMQfs/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/ma67yOdMQfs/mqdefault.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://i.ytimg.com/vi/ma67yOdMQfs/hqdefault.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "Red Bull Surfing",
          liveBroadcastContent: "none",
          publishTime: "2021-01-23T17:00:15Z",
        },
      },
    ],
  });
});

connection.on("connected", () => {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
});
