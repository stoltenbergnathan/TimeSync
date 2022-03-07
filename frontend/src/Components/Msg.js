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

const SOCKET_SERVER_URL = "http://localhost:80";

function Msg({ name }) {
  const sentStyle = "bg-primary text-light m-1";
  const receivedStyle = "bg-light text-dark m-1";
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
  });

  const sendMessage = (e) => {
    e.preventDefault();
    let now = new Date();
    now = dateFormat(now, "h:MM TT");
    let message = {
      username: user,
      text: msg,
      time: now,
    };
    setMsg("");
    socketRef.current.emit("sendMsg", message);
  };

  function messageType(message) {
    let content = (
      <>
        <span>{message.username} </span>
        <span style={{ fontSize: "10px", color: "lightgrey" }}>
          {message.time}
        </span>
        <hr className="m-0" />
        <p>{message.text}</p>
      </>
    );

    if (message.username === "alert") {
      if (currentRoom === user) {
        return (
          <>
            <Alert variant="warning" className="m-5">
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
          <Button
            className={sentStyle}
            style={{ float: "right", maxWidth: "50%" }}
          >
            {content}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            className={receivedStyle}
            style={{ float: "left", maxWidth: "50%" }}
          >
            {content}
          </Button>
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
        <InputGroup>
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
          <Button variant="primary" size="md" type="submit">
            Send
          </Button>
        </InputGroup>
      </Form>
    </>
  );
}

export default Msg;
