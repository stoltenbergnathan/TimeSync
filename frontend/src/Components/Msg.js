import { React, useState, useEffect, useRef } from "react";
import {
  Container,
  Button,
  Form,
  ListGroup,
  InputGroup,
  Alert,
} from "react-bootstrap";
import dateFormat from "dateformat";
import socketIOClient from "socket.io-client";

function Msg({ name }) {
  const SOCKET_SERVER_URL = "http://localhost:80";
  const socketRef = useRef();

  const [msgList, setList] = useState([]);
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState("");
  const [friendName, setFriendName] = useState("");
  const [currentRoom, setRoom] = useState("");

  useEffect(() => {
    fetch("http://localhost/getCurrentUser", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setUser(data.user));

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
    if (name === "") {
      msgInput.disabled = true;
      msgButt.disabled = true;
    } else {
      msgInput.disabled = false;
      msgButt.disabled = false;
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
      text: msg,
      time: now,
    };
    setMsg("");
    socketRef.current.emit("sendMsg", message);
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

  function messageType(message) {
    let content = (
      <>
        <span style={{ fontSize: "10px", color: "grey" }}>{message.time}</span>
        <p className="m-0">{message.text}</p>
      </>
    );

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
  }

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
          <Button id="msgButt" variant="primary" size="md" type="submit">
            Send
          </Button>
        </InputGroup>
      </Form>
    </>
  );
}

export default Msg;
