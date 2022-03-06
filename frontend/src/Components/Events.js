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
import EventShow from "./EventShow";

function Events() {
  const [selectedTopic, setSelectedTopic] = useState({
    topic: "",
  });
  const [selectedCity, setSelectedCity] = useState({
    city: "",
  });

  const [list, setList] = useState([]);

  const [firstTry, setFirstTry] = useState(true);

  const formSubmitted = (event) => {
    event.preventDefault();
    setFirstTry(false);
    fetch(
      `http://localhost/api/events?topic=${selectedTopic}&city=${selectedCity}`
    )
      .then((response) => response.json())
      .then((data) => {
        setList(data);
      });
  };

  function renderEvents() {
    if (list.length === 0) {
      if (firstTry) {
        return <></>;
      }
      console.log("in if");
      return (
        <>
          <Alert variant="danger">
            <Alert.Heading>No events found!</Alert.Heading>
            <p>Try using a different keyword or location.</p>
          </Alert>
        </>
      );
    }
    return list.map((prev) => (
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
    ));
  }

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
          {renderEvents()}
        </Col>
      </Row>
    </Container>
  );
}

export default Events;
