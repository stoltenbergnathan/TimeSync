import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ChatLogo } from "../assets/chat.svg";
import { ReactComponent as DeleteLogo } from "../assets/trash.svg";

function Friend({ name, handleFriendDeletion }) {
  const nav = useNavigate();
  return (
    <Row className="">
      <Col xs={5}>
        <p>{name}</p>
      </Col>
      <Col xs={5}>
        <Button onClick={() => nav(`/messages`, { state: { name: name } })}>
          Message{" "}
          <span>
            <ChatLogo style={{ width: "20px", fill: "white" }} />
          </span>
        </Button>
      </Col>
      <Col xs={2}>
        <Button
          onClick={(e) => handleFriendDeletion(e, name)}
          className="btn-danger"
        >
          <span>
            <DeleteLogo style={{ width: "20px", fill: "white" }} />
          </span>
        </Button>
      </Col>
    </Row>
  );
}

export default Friend;
