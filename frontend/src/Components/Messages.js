import React from "react";
import { Container, Button, Row, Col, ListGroup } from "react-bootstrap";
import Msg from "./Msg";
import { useEffect, useState } from "react";

function Messages() {
  const [friendList, setFriendList] = useState([]);
  const [friendName, setFriendName] = useState("");

  useEffect(() => {
    fetch("http://localhost/Friends", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => setFriendList(data));
  }, []);

  function clickFriend(e, friend) {
    if (friend === friendName) {
      friend = "";
    }
    setFriendName(friend);
  }

  function friendButton(friend) {
    if (friend === friendName) {
      return (
        <>
          <Button
            onClick={(e) => clickFriend(e, friend)}
            className="btn-primary btn-outline w-75"
          >
            {friend}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            onClick={(e) => clickFriend(e, friend)}
            className="w-75"
            variant="dark"
          >
            {friend}
          </Button>
        </>
      );
    }
  }

  return (
    <>
      <Container fluid style={{ height: "92vh", maxHeight: "92vh" }}>
        <Row style={{ height: "100%" }}>
          <Col xs={4} className="bg-light h-100">
            <h2 className="text-center text-dark">Friends</h2>
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
