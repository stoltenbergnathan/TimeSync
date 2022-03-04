import { useState } from "react";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";
import Settings from "./Settings";
import Friends from "./Friends";

function ProfilePage() {
  const [user, setUser] = useState("username");
  const [friendList, setFriendList] = useState([]);
  const [selection, setSelection] = useState("");

  const handleLogOut = (e) => {
    console.log("LOGOUT");
  };

  const handleSwitch = (e) => {
    console.log(e.target.innerHTML);
    setSelection(e.target.innerHTML);
  };

  const renderSelection = () => {
    console.log(selection);
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
      <header>
        <h1>{user}</h1>
        <Button onClick={handleLogOut}>Log Out</Button>
      </header>
      <Row>
        <Col className="col-3">
          <Nav variant="tabs" className="flex-column">
            <Nav.Link onClick={handleSwitch}>Settings</Nav.Link>
            <Nav.Link onClick={handleSwitch}>Friends</Nav.Link>
          </Nav>
        </Col>
        <Col className="col-3">{renderSelection()}</Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
