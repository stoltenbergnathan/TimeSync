const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: ".server/config.env" });
const PORT = process.env.PORT || 80;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

const dbo = require("./server/conn");
app.listen(PORT, () => {
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`listening on port ${PORT}`);
});
