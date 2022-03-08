import { React, useState } from "react";
import { Alert, Container, Row, Col, Button } from "react-bootstrap";
import GetFeed from "./GetFeed";
function Homepage() {
  const [list, setList] = useState([]);

  const [loading, setLoading] = useState(true);

  const AreaFeed = (event) => {
    event.preventDefault();
    fetch("http://localhost/AreaFeed", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setList(data);
      });
  };
  const PersonalFeed = (event) => {
    setList([]);
    event.preventDefault();

    fetch("http://localhost/PersonalFeed", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setList(data);
      });

    fetch("http://localhost/ActivityPersonalFeed", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setList([...list, data]);
        setLoading(false);
      });
  };

  function renderEvents() {
    if (loading) return <></>;
    if (list.length === 0) {
      return (
        <>
          <Alert variant="danger m-3">
            <Alert.Heading>No Posts found!</Alert.Heading>
          </Alert>
        </>
      );
    }
    return (
      <>
        {console.log(list)}
        {list.map((prev) => (
          <GetFeed
            title={prev.title}
            genre={prev.genre}
            dateTime={prev.dateTime}
            eventUrl={prev.eventUrl}
            imageUrl={prev.imageUrl}
            username={prev.username}
          />
        ))}
      </>
    );
  }

  return (
    <div>
      <div className=" d-flex justify-content-center">
        <Button
          onClick={(e) => AreaFeed(e)}
          variant="primary  w-25 m-1"
          size="lg"
        >
          Area Feed
        </Button>
        <Button
          onClick={(e) => PersonalFeed(e)}
          variant="success w-25 m-1"
          size="lg"
        >
          Personal Feed
        </Button>
      </div>
      <Container fluid className="col-5 m-auto">
        <Row>
          <Col className="m-3">{renderEvents()}</Col>
        </Row>
      </Container>
    </div>
  );
}

export default Homepage;
