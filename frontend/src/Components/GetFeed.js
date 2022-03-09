import { React } from "react";
import { Container, Row, Col } from "react-bootstrap";

function GetFeed(props) {
  let date = [];
  date = props.ctime.split("T");
  if (props.kind === "Activity") {
    return (
      <Container
        fluid
        className=" rounded shadow-lg m-3"
        style={{ padding: "10px" }}
      >
        <Row>
          <Col className=" col-4">
            <h5>
              @{props.username}
              <br />
              {date[0]}
            </h5>
          </Col>

          <Col className="m-auto col-8" style={{ textAlign: "center" }}>
            <h5>did the activity: </h5>
            <br />
            <h5>{props.title}</h5>
          </Col>
        </Row>
      </Container>
    );
  } else if (props.kind === "Event") {
    return (
      <Container className=" rounded shadow-lg m-3" style={{ padding: "10px" }}>
        <Row>
          <Col className="col-6 m-auto">
            <h5>
              @{props.username}
              <br />
              {date[0]}
            </h5>

            <a
              href={props.eventUrl}
              rel="noreferrer"
              target="_blank"
              style={{ fontSize: 14, padding: "4px" }}
            >
              <img
                src={props.imageUrl}
                alt="event preview"
                style={{ height: "80%", width: "90%" }}
              ></img>
            </a>
          </Col>
          <Col className="m-auto col-6">
            <h5>Event:</h5>
            <p>{props.title}</p>
            <Row>
              <Col>
                <h5>Genre:</h5>
                <p>{props.genre}</p>
              </Col>
              <Col>
                <h5>Date/Time:</h5>
                <p>{props.dateTime.localDate}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  } else return null;
}

export default GetFeed;
