import { React, useState } from "react";
import {
  Alert,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";

function GetFeed(props) {
  return (
    <Container
      className="border rounded border-secondary"
      style={{ padding: "10px", textAlign: "center" }}
    >
      <Row>
        <Col className="col-4 m-auto">
          <a
            href={props.eventUrl}
            rel="noreferrer"
            target="_blank"
            style={{ fontSize: 14 }}
          >
            <img
              src={props.imageUrl}
              alt="event preview"
              style={{ height: "100%", width: "100%" }}
            ></img>
          </a>
        </Col>
        <Col className="m-auto col-8">
          <h5>Event:</h5>
          <p>{props.title}</p>
          <Row>
            <Col>
              <h5>Genre:</h5>
              <p>{props.genre}</p>
            </Col>
            <Col>
              <h5>Date/Time:</h5>
              <p>
                {props.dateTime.localDate} {props.dateTime.localTime}
              </p>
            </Col>
          </Row>
          <h6>Posted By: {props.username}</h6>
        </Col>
      </Row>
    </Container>
  );
}

export default GetFeed;
