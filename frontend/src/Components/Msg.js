import { React, useState, useEffect } from "react";
import {
  Container,
  Button,
  Form,
  ListGroup,
  InputGroup,
} from "react-bootstrap";
import dateFormat from "dateformat";
const socket = require("socket.io-client");

function Msg() {
  const sentStyle = "bg-primary text-light m-1";
  const receivedStyle = "bg-light text-dark m-1";

  const [msgList, setList] = useState([]);
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch("http://localhost/getCurrentUser", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setUser(data.user));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    let now = new Date();
    now = dateFormat(now, "h:MM TT");
    let message = {
      username: user,
      text: msg,
      time: now,
    };
    console.log(message);
    setList((prev) => [...prev, message]);
    setMsg("");
  };

  return (
    <>
      <ListGroup id="messages" style={{ overflow: "auto", height: "93%" }}>
        {msgList.map((message) => (
          <Container fluid>
            <Button
              className={sentStyle}
              style={{ float: "right", maxWidth: "50%" }}
            >
              <span>{message.username} </span>
              <span style={{ fontSize: "10px", color: "lightgrey" }}>
                {message.time}
              </span>
              <hr className="m-0" />
              <p>{message.text}</p>
            </Button>
          </Container>
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
          <Button variant="dark" size="md" type="submit">
            Send
          </Button>
        </InputGroup>
      </Form>
    </>
  );
}

export default Msg;
