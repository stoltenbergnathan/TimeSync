import React from "react";
import { Container, Button, Row, Col, ListGroup } from "react-bootstrap";
import Msg from "./Msg";
import { useEffect, useState } from "react";

function Messages() {
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    fetch("http://localhost/Friends", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => setFriendList(data));
  }, []);

  return (
    <>
      <Container fluid style={{ height: "92vh", maxHeight: "92vh" }}>
        <Row style={{ height: "100%" }}>
          <Col sm={4} className="bg-light h-100">
            <h2 className="text-center text-dark">Friends</h2>
            <ListGroup
              id="friends"
              className="text-center"
              style={{ overflow: "auto" }}
            >
              {friendList.map((friend) => (
                <Container className="mt-1">
                  <Button className="btn-dark w-75">{friend}</Button>
                </Container>
              ))}
            </ListGroup>
          </Col>

          <Col sm={8} className="h-100">
            <Msg />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Messages;
