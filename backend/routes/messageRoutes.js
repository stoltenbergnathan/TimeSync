const express = require("express");
const messageRouter = express.Router();
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
require("dotenv").config();
const cors = require("cors");
const MongoStore = require("connect-mongo");
const Message = require("../db/schemas/Message");
const server = require("../connection/Connect").server;

messageRouter.use(express.json());
messageRouter.use(express.urlencoded({ extended: false }));
messageRouter.use(passport.initialize());
messageRouter.use(passport.session());
messageRouter.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.ATLAS_URI }),
  })
);
messageRouter.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
    credentials: true,
  })
);

messageRouter.post("/sendMessage", (req, res) => {
  if (req.body.type === "message") {
    const newMessage = new Message({
      username: req.body.username,
      recipient: req.body.recipient,
      room: req.body.room,
      type: req.body.type,
      data: { text: req.body.text },
      time: req.body.time,
    });
    newMessage.save();
  }
  res.json({ message: "success" });
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  let room = "";

  socket.on("sendMsg", (data) => {
    io.in(room).emit("sendMsg", data);
  });

  socket.on("changeRoom", (data) => {
    socket.leave(room);
    room = data;
    socket.join(room);
    Message.find({ room: room }, (e, d) => {
      if (e) console.log(e);
      else {
        d.map((msg) => {
          let message = {
            username: msg.username,
            recipient: msg.recipient,
            room: msg.room,
            type: msg.text,
            data: msg.data,
            time: msg.time,
          };
          socket.emit("sendMsg", message);
        });
      }
    });
  });

  socket.on("disconnect", () => {});
});

module.exports = messageRouter;
