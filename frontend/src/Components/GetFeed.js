import { React } from "react";
import { Container, Row, Col } from "react-bootstrap";
import dateFormat from "dateformat";
import PostComment from "./PostComment.js";

function GetFeed(props) {
  let date = [];
  date = props.ctime;
  date = dateFormat(date, "mm/dd/yy h:MM TT");
  if (props.kind === "Activity") {
    return (
      <Container
        fluid
        className=" rounded shadow m-3"
        style={{ padding: "10px" }}
      >
        <Row>
          <Col className=" col-4">
            <h6>
              @{props.username}
              <br />
            </h6>
            <p style={{ color: "grey", fontSize: "12px" }}>{date}</p>
          </Col>

          <Col className="m-auto col-8" style={{ textAlign: "center" }}>
            <h6 className="mb-2">Shared Activity: </h6>
            <h6>{props.title}</h6>
          </Col>
        </Row>
        <br />
        <PostComment
          _id={props._id}
          comments={props.comments}
          kind={props.kind}
        />
      </Container>
    );
  } else if (props.kind === "Event") {
    return (
      <Container className=" rounded shadow m-3" style={{ padding: "10px" }}>
        <Row>
          <Col className="col-6 m-auto">
            <h6>
              @{props.username}
              <br />
            </h6>
            <p style={{ color: "grey", fontSize: "12px" }}>{date}</p>

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
            <h6>Event:</h6>
            <p>{props.title}</p>
            <Row>
              <Col>
                <h6>Genre:</h6>
                <p>{props.genre}</p>
              </Col>
              <Col>
                <h6>Date/Time:</h6>
                <p style={{ fontSize: "12px" }}>
                  {dateFormat(props.dateTime.dateTime, "mm/dd/yy h:MM TT")}
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
        <br />
        <PostComment
          _id={props._id}
          comments={props.comments}
          kind={props.kind}
        />
      </Container>
    );
  } else if (props.kind === "Post") {
    return (
      <Container
        fluid
        className=" rounded shadow m-3"
        style={{ padding: "10px" }}
      >
        <Row>
          <Col className=" col-4">
            <h6>
              @{props.username}
              <br />
            </h6>
            <p style={{ color: "grey", fontSize: "12px" }}>{date}</p>
          </Col>

          <Col className="m-auto col-8" style={{ textAlign: "center" }}>
            <br />
            <p>{props.title}</p>
          </Col>
        </Row>
        <br />
        <PostComment
          _id={props._id}
          comments={props.comments}
          kind={props.kind}
        />
      </Container>
    );
  } else return null;
}

export default GetFeed;
