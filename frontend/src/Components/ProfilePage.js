import { useEffect, useState } from "react";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";
import Settings from "./Settings";
import Friends from "./Friends";
import FriendRequests from "./FriendRequests";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const nav = useNavigate();
  const [user, setUser] = useState("");
  const [selection, setSelection] = useState("");

  useEffect(() => {
    fetch("http://localhost/getCurrentUser", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setUser(data.user));
  }, []);

  const handleLogOut = (e) => {
    fetch("http://localhost/logout", {
      method: "POST",
      credentials: "include",
    }).then(nav("/login"));
  };

  const handleSwitch = (e) => {
    setSelection(e.target.innerHTML);
  };

  const renderSelection = () => {
    switch (selection) {
      case "Settings":
        return <Settings username={user} />;
      case "Friends":
        return <Friends username={user} />;
      case "Friend Requests":
        return <FriendRequests />;
      default:
        return "";
    }
  };

  return (
    <Container>
      <br />
      <Row className="bg-dark">
        <Col className="col-10">
          <h1 className="text-light">{user}</h1>
        </Col>
        <Col>
          <Button className="mt-2" onClick={handleLogOut}>
            Log Out
          </Button>
        </Col>
      </Row>
      <br />
      <Row>
        <Col className="col-3">
          <Nav variant="tabs" className="flex-column">
            <Nav.Link onClick={handleSwitch}>Settings</Nav.Link>
            <Nav.Link onClick={handleSwitch}>Friends</Nav.Link>
            <Nav.Link onClick={handleSwitch}>Friend Requests</Nav.Link>
          </Nav>
        </Col>
        <Col className="col-9">{renderSelection()}</Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
