import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Friend({ name, handleFriendDeletion }) {
  const nav = useNavigate();
  return (
    <Row className="">
      <Col>
        <p>{name}</p>
      </Col>
      <Col>
        <Button onClick={() => nav(`/messages?currentUser=${name}`)}>
          Send Message
        </Button>
      </Col>
      <Col>
        <Button
          onClick={(e) => handleFriendDeletion(e, name)}
          className="btn-danger"
        >
          Delete
        </Button>
      </Col>
    </Row>
  );
}

export default Friend;
