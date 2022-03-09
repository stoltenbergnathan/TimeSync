import { React, useState, useEffect, useRef } from "react";
import {
  Container,
  SplitButton,
  Form,
  ListGroup,
  InputGroup,
  Alert,
  Dropdown,
} from "react-bootstrap";
import dateFormat from "dateformat";
import socketIOClient from "socket.io-client";
import PersonalTask from "./PersonalTask";

function Msg({ name }) {
  const SOCKET_SERVER_URL = "http://localhost:80";
  const socketRef = useRef();

  const [msgList, setList] = useState([]);
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState("");
  const [friendName, setFriendName] = useState("");
  const [currentRoom, setRoom] = useState("");
  const [savedSyncs, setSyncs] = useState([]);

  useEffect(() => {
    fetch("http://localhost/getCurrentUser", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setUser(data.user));

    fetch("http://localhost/Syncs", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) setSyncs([]);
        setSyncs(data);
      });

    socketRef.current = socketIOClient(SOCKET_SERVER_URL);
    socketRef.current.on("sendMsg", (data) => {
      setList((prev) => [...prev, data]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    const messages = document.querySelector("#messages");
    messages.scrollTop = messages.scrollHeight - messages.clientHeight;
  });

  useEffect(() => {
    const msgInput = document.querySelector("#msg");
    const msgButt = document.querySelector("#msgButt");
    const msgMButt = document.querySelector(".btn-primary");
    if (name === "") {
      msgInput.disabled = true;
      msgButt.disabled = true;
      msgMButt.disabled = true;
    } else {
      msgInput.disabled = false;
      msgButt.disabled = false;
      msgMButt.disabled = false;
    }
    setFriendName(name);
    let room;
    if (friendName < user) {
      room = friendName + user;
    } else {
      room = user + friendName;
    }
    if (currentRoom !== room) {
      setRoom(room);
      setList([]);
      socketRef.current.emit("changeRoom", room);
    }
  }, [name, friendName, user, currentRoom]);

  const sendMessage = (e) => {
    e.preventDefault();
    let now = new Date();
    now = dateFormat(now, "h:MM TT");
    let message = {
      username: user,
      recipient: friendName,
      room: currentRoom,
      type: "message",
      data: { text: msg },
      time: now,
    };
    socketRef.current.emit("sendMsg", message);
    setMsg("");
    if (friendName !== "") {
      fetch("http://localhost/sendMessage", {
        method: "POST",
        body: JSON.stringify(message),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

  const handleSyncShare = (e) => {
    let sync = savedSyncs.find(
      (el) =>
        el.sync.activity === e.target.text || el.sync.title === e.target.text
    );
    console.log(sync);
    let now = dateFormat(new Date(), "h:MM TT");
    let data, type;
    if (sync.type === "activity") {
      data = {
        activity: sync.sync.activity,
        link: sync.sync.link,
        type: sync.sync.type,
      };
      type = "activity";
    }
    let message = {
      username: user,
      recipient: friendName,
      room: currentRoom,
      type: type,
      data: data,
      time: now,
    };
    socketRef.current.emit("sendMsg", message);
    fetch("http://localhost/sendMessage", {
      method: "POST",
      body: JSON.stringify(message),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  const handleSyncRender = (sync) => {
    switch (sync.type) {
      case "activity":
        return `${sync.sync.activity}`;
      case "event":
        return `${sync.sync.title}`;
      default:
        break;
    }
  };

  const messageType = (message) => {
    console.log(message);
    if (message.username === "alert") {
      if (currentRoom === user) {
        return (
          <>
            <Alert variant="warning" className="text-center m-5 shadow-lg">
              Click a friend on the left to start a conversation.
            </Alert>
          </>
        );
      } else {
        return <></>;
      }
    }
    let content;
    switch (message.type) {
      case "message":
        content = (
          <>
            <span style={{ fontSize: "10px", color: "grey" }}>
              {message.time}
            </span>
            <p className="m-0">{message.data.text}</p>
          </>
        );
        break;
      case "activity":
        let u = true;
        if (message.username === user) u = false;
        content = (
          <>
            <span style={{ fontSize: "10px", color: "grey" }}>
              {message.time}
            </span>
            <PersonalTask
              activity={message.data.activity}
              type={message.data.type}
              link={message.data.link}
              msg={u}
            />
          </>
        );
        break;
      case "event":
        break;
      default:
    }

    if (message.username === user) {
      return (
        <>
          <Alert
            variant="info"
            className="m-1 shadow"
            style={{ float: "right", maxWidth: "50%" }}
          >
            {content}
          </Alert>
        </>
      );
    } else {
      return (
        <>
          <Alert
            variant="light"
            className="m-1 shadow"
            style={{ float: "left", maxWidth: "50%" }}
          >
            {content}
          </Alert>
        </>
      );
    }
  };

  return (
    <>
      <ListGroup id="messages" style={{ overflow: "auto", height: "93%" }}>
        {messageType({ username: "alert" })}
        {msgList.map((message) => (
          <Container fluid>{messageType(message)}</Container>
        ))}
      </ListGroup>
      <Form id="messageInput" onSubmit={sendMessage}>
        <InputGroup className="m-1">
          <Form.Control
            id="msg"
            type="text"
            size="md"
            placeholder="Type Message... "
            required={true}
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
          />
          <SplitButton
            id="msgButt"
            variant="primary"
            title="Send"
            size="md"
            type="submit"
          >
            <Dropdown.Item style={{ color: "black" }} disabled>
              Share Sync
            </Dropdown.Item>
            <Dropdown.Divider />
            {savedSyncs.map((sync) => (
              <Dropdown.Item onClick={(e) => handleSyncShare(e)}>
                {handleSyncRender(sync)}
              </Dropdown.Item>
            ))}
          </SplitButton>
        </InputGroup>
      </Form>
    </>
  );
}

export default Msg;
