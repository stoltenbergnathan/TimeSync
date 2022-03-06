import React from "react";
import { Container, Button, Row, Col, Form, ListGroup } from "react-bootstrap";

function Msg() {
  return (
    <>
      <ListGroup id="messages" style={{ overflow: "auto" }}></ListGroup>
      <Form
        id="messageInput"
        className="position-absolute bottom-0 translate-middle-y w-50"
      >
        <Row>
          <Col md={10}>
            <Form.Control
              type="text"
              size="md"
              placeholder="Type Message... "
            />
          </Col>
          <Col md={2}>
            <Button variant="primary" size="md">
              Send
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default Msg;
