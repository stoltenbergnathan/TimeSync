require("dotenv").config();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 80;
const connectionString = process.env.ATLAS_URI;
const express = require("express");
const app = express();
const connection = mongoose.connection;

const server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
  })
  .then((result) => {
    console.log(`Connected to ${result.connection.name} db`);
  })
  .catch((error) => console.log(error));

module.exports = {
  connection,
  express,
  server,
  app,
};
