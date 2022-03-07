const express = require("express");
const messageRouter = express.Router();
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();
const cors = require("cors");
const MongoStore = require("connect-mongo");
const Message = require("../db/schemas/Message");
const app = express();
var http = require("http").createServer(app);
const io = require("socket.io")(http);

messageRouter.use(express.json());
messageRouter.use(express.urlencoded({ extended: false }));
messageRouter.use(passport.initialize());
messageRouter.use(passport.session());
messageRouter.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
    credentials: true,
  })
);

io.on("connection", (socket) => {
  console.log("client connected");
  socket.emit("connection");
});
