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

app.get("/api/personal", (req, res) => {
  const data = makeAPIcall("https://www.boredapi.com/api/activity");
  data.then((x) => {
    console.log(x);
    res.send(x);
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
