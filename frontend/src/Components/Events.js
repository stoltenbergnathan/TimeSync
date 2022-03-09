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
    fetch(
      `http://timesync.one/api/events?topic=${selectedTopic}&city=${selectedCity}`
    )
      .then((response) => response.json())
      .then((data) => {
        setList(data);
        setFirstTry(false);
      });
  };

  function renderEvents() {
    if (list.length === 0) {
      if (firstTry) {
        return <></>;
      }

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
        <Col className="m-1" style={{ textAlign: "center" }}>
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
          </Form>
          <br />
        </Col>
      </Row>
      <Row>
        <Col className="m-1" style={{ textAlign: "center" }}>
          {renderEvents()}
        </Col>
      </Row>
    </Container>
  );
}

export default Events;
