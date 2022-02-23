require("dotenv").config();
const mongoose = require("mongoose");
const connectionString = process.env.ATLAS_URI;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
  })
  .then((result) => {
    console.log(`Connected to ${result.connection.name} db`);
  })
  .catch((error) => console.log(error));

module.exports = mongoose.connection;
