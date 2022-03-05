import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Friend({ name }) {
  const nav = useNavigate();
  return (
    <Row className="">
      <Col>
        <p>{name}</p>
      </Col>
      <Col>
        <Button onClick={() => nav("/messages")}>Send Message</Button>
      </Col>
    </Row>
  );
}

export default Friend;
