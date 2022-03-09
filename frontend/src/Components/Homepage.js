import { React, useState } from "react";
import { Alert, Spinner, Container, Row, Col, Button } from "react-bootstrap";
import GetFeed from "./GetFeed";
function Homepage() {
  const [list, setList] = useState([]);

  const [loading, setLoading] = useState(true);

  const AreaFeed = (event) => {
    setLoading(true);
    event.preventDefault();
    fetch("http://localhost/AreaFeed", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        // setList(data);
        console.log(list);
        setList(
          data.sort(function (a, b) {
            const date1 = new Date(a.createdAt).getTime();
            const date2 = new Date(b.createdAt).getTime();
            return date1 > date2 ? -1 : date1 < date2 ? 1 : 0;
          })
        );
        setLoading(false);
      });
  };
  const PersonalFeed = (event) => {
    setLoading(true);
    event.preventDefault();

    fetch("http://localhost/PersonalFeed", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setList(
          data.sort(function (a, b) {
            const date1 = new Date(a.createdAt).getTime();
            const date2 = new Date(b.createdAt).getTime();
            return date1 > date2 ? -1 : date1 < date2 ? 1 : 0;
          })
        );
        setLoading(false);
      });
  };

  function renderEvents() {
    if (loading)
      return (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      );
    if (list === undefined) {
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
        {list.map((prev) => (
          <GetFeed
            key={prev._id}
            title={prev.title}
            genre={prev.genre}
            dateTime={prev.dateTime}
            eventUrl={prev.eventUrl}
            imageUrl={prev.imageUrl}
            username={prev.username}
            kind={prev.kind}
            ctime={prev.createdAt}
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
