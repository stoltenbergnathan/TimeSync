const { MongoClient } = require("mongodb");
const Database = process.env.ATLAS_URI;
const client = new MongoClient(Database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
let _db;
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("TimeSync DataBase");
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
         });
  },
 
  getDatabase: function () {
    return _db;
  },
};