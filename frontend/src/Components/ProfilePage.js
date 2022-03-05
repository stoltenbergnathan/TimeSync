import { useState } from "react";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";
import Settings from "./Settings";
import Friends from "./Friends";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const nav = useNavigate();
  const [user, setUser] = useState("username");
  const [selection, setSelection] = useState("");

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
        return <Settings />;
      case "Friends":
        return <Friends />;
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
          </Nav>
        </Col>
        <Col className="col-9">{renderSelection()}</Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
