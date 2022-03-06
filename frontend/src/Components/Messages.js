import React from "react";
import { Container, Button, Row, Col, Form, ListGroup } from "react-bootstrap";
import Msg from "./Msg";
import MsgFriends from "./MsgFriends";

function Messages() {
  return (
    <>
      <Container fluid>
        <Row className="m-1">
          <Col md={4}>
            <h2 class="text-center">Friends</h2>
            <ListGroup id="friends" style={{ overflow: "auto" }}></ListGroup>
          </Col>

          <Col md={8}>
            <Msg />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Messages;
