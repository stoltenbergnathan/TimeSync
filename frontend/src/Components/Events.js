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

  const [list, setList] = useState([]);

  const formSubmitted = (event) => {
    event.preventDefault();
    fetch(
      `http://localhost/api/events?topic=${selectedTopic}&city=${selectedCity}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setList(data);
      });
  };

  return (
    <Container fluid className="col-6 m-auto">
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
          {list.map((prev) => (
            <>
              <EventShow
                title={prev.title}
                genre={prev.genre}
                dateTime={prev.dateTime}
                eventUrl={prev.eventUrl}
                imageUrl={prev.imageUrl}
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
