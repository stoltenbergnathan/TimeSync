const express = require("express");
const app = express();
const PORT = process.env.PORT || 80;

app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
