import { React, useState } from "react";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import PersonalTask from "./PersonalTask";
import YouTubeVideo from "./YouTubeVideo";

function Personal() {
  const [selectedType, setSelectedType] = useState("");
  const [generatedActivity, setActivity] = useState({
    type: "",
    activity: "",
    link: "",
  });
  const [videos, setVideos] = useState([]);
  const [history, setHistory] = useState([]);

  const formSubmitted = (event) => {
    event.preventDefault();
    fetch(`http://localhost/api/personal?type=${selectedType}`)
      .then((response) => response.json())
      .then((data) => {
        setActivity({ ...data });
        setHistory((prev) => [data, ...prev.slice(0, 2)]);
      });
  };

  const generateTutorials = (activity) => {
    fetch(`http://localhost/api/youtube/${activity}`)
      .then((response) => response.json())
      .then((data) => setVideos(data.items));
  };

  let currentActivity =
    generatedActivity.activity === "" ? (
      <p>Click generate activity to get a suggestion</p>
    ) : (
      <PersonalTask
        activity={generatedActivity.activity}
        type={generatedActivity.type}
        link={generatedActivity.link}
        generatorFunction={generateTutorials}
      />
    );

  return (
    <Container fluid>
      <Row>
        <Col className="border m-1" style={{ textAlign: "center" }}>
          <Form onSubmit={formSubmitted}>
            <h3>Current Activity</h3>
            <Form.Label title="Type" htmlFor="type-select">
              Select Category:
            </Form.Label>
            <InputGroup>
              <Form.Select
                id="type-select"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option defaultValue value="any">
                  any
                </option>
                <option value="charity">charity</option>
                <option value="cooking">cooking</option>
                <option value="music">music</option>
                <option value="diy">diy</option>
                <option value="education">education</option>
                <option value="social">social</option>
                <option value="busywork">busywork</option>
                <option value="recreational">recreational</option>
              </Form.Select>
              <Button type="submit">Generate Activity</Button>
            </InputGroup>
          </Form>
          <br />
          {currentActivity}
        </Col>
        <Col className="border m-1" style={{ textAlign: "center" }}>
          <h3>Previous Activities</h3>
          {history.map((prev) => (
            <>
              <PersonalTask
                activity={prev.activity}
                type={prev.type}
                link={prev.link}
                generatorFunction={generateTutorials}
              />
              <br />
            </>
          ))}
        </Col>
        <Col className="border m-1" style={{ textAlign: "center" }}>
          <h3>Youtube Tutorials</h3>
          {
            // Make this only appear when a button is pressed
            videos.map((video) => (
              <YouTubeVideo video={video} />
            ))
          }
        </Col>
      </Row>
    </Container>
  );
}

export default Personal;
