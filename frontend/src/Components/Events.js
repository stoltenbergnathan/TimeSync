import { React, useState } from "react";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import EventShow from "./EventShow";

function Events() {
  const [selectedTopic, setSelectedTopic] = useState({
    topic: "",
  });
  const [selectedCity, setSelectedCity] = useState({
    city: "",
  });
  const [generatedEvent, setEvent] = useState({
    title: "",
    description: "",
    dateTime: "",
    eventUrl: "",
    duration: "",
    imgId: "",
    imgBaseUrl: "",
    imgPreview: "",
  });

  const [list, setList] = useState([]);

  const formSubmitted = (event) => {
    event.preventDefault();
    fetch(
      `http://localhost/api/events?topic=${selectedTopic}&city=${selectedCity}`
    )
      .then((response) => response.json())
      .then((data) => {
        setEvent({ ...data });
        setList((prev) => [data, ...list.slice(0, 2)]);
      });
  };

  let foundEvents =
    generatedEvent.title === "" ? (
      <p>Click generate event to get a suggestion</p>
    ) : (
      <EventShow
        title={generatedEvent.title}
        description={generatedEvent.description}
        dateTime={generatedEvent.dateTime}
        eventUrl={generatedEvent.eventUrl}
        duration={generatedEvent.duration}
        imgBaseUrl={generatedEvent.imgBaseUrl}
        imgId={generatedEvent.imgId}
        imgPreview={generatedEvent.imgPreview}
      />
    );

  return (
    <Container fluid>
      <Row>
        <Col className="border m-1" style={{ textAlign: "center" }}>
          <Form onSubmit={formSubmitted}>
            <h3>Find Event</h3>
            <Form.Label title="Topic" htmlFor="topic-select">
              Choose Topic:
            </Form.Label>
            <InputGroup>
              <Form.Control
                id="topic-text"
                onChange={(e) => setSelectedTopic(e.target.value)}
                placeholder="Event Topic"
              ></Form.Control>
            </InputGroup>
            <Form.Label title="City" htmlFor="city-select">
              Choose City:
            </Form.Label>
            <InputGroup>
              <Form.Control
                id="city-text"
                onChange={(e) => setSelectedCity(e.target.value)}
                placeholder="City"
              ></Form.Control>
            </InputGroup>

            <Button className="mt-4 " type="submit">
              Find Events
            </Button>
            <br />

            <Form.Text>
              Click Find Events to search for events near you
            </Form.Text>
          </Form>
          <br />
        </Col>
      </Row>
      <Row>
        <Col className="border m-1" style={{ textAlign: "center" }}>
          <h3>Events</h3>
          {list.map((list) => (
            <>
              <EventShow
                title={list.title}
                description={list.description}
                dateTime={list.dateTime}
                eventUrl={list.eventUrl}
                duration={list.duration}
                imgBaseUrl={list.imgBaseUrl}
                imgId={list.imgId}
                imgPreview={list.imgPreview}
              />
              <br />
            </>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
export default Events;
