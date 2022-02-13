const express = require("express");
const app = express();
const PORT = process.env.PORT || 80;
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

async function makeAPIcall(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// See link below for API data vars
// https://github.com/drewthoennes/Bored-API/blob/a978ac490c4c3aff555e7453ad8e577b658f8864/src/backend/models/Activity.js
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
  console.log(`listening on http://localhost:${PORT}`);
});
