import React from "react";
import { Container, Row, Col, ListGroup, Alert } from "react-bootstrap";
import Msg from "./Msg";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Messages() {
  const [friendList, setFriendList] = useState([]);
  const [friendName, setFriendName] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setFriendName(location.state.name);
    }
    fetch("http://localhost/Friends", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => setFriendList(data));
  }, [location.state]);

  const friendButton = (friend) => {
    if (friend === friendName) {
      return (
        <>
          <Alert
            onClick={(e) => setFriendName(friend)}
            className="mt-1 mb-1 shadow-sm p-2"
            variant="dark"
            id="friendCol"
          >
            {friend}
          </Alert>
        </>
      );
    } else {
      return (
        <>
          <Alert
            onClick={(e) => setFriendName(friend)}
            className="mt-1 mb-1 shadow-sm border p-2"
            variant="light"
            id="friendCol"
          >
            {friend}
          </Alert>
        </>
      );
    }
  };

  return (
    <>
      <Container fluid style={{ height: "92vh", maxHeight: "92vh" }}>
        <Row style={{ height: "100%" }}>
          <Col
            xs={4}
            id="sidebar"
            className="h-100"
            style={{ background: "white" }}
          >
            <h2 className="text-center text-dark m-2">Friends</h2>
            <ListGroup
              id="friends"
              className="text-center"
              style={{ overflow: "auto" }}
            >
              {friendList.map((friend) => (
                <Container className="mt-1">{friendButton(friend)}</Container>
              ))}
            </ListGroup>
          </Col>

          <Col xs={8} className="h-100">
            <Msg name={friendName} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Messages;
