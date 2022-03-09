import { useEffect, useState } from "react";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";
import Settings from "./Settings";
import Friends from "./Friends";
import FriendRequests from "./FriendRequests";
import { useNavigate } from "react-router-dom";
import SavedSyncs from "./SavedSyncs";
import { ReactComponent as LogOutLogo } from "../assets/log-out.svg";
import { ReactComponent as CogLogo } from "../assets/cog.svg";
import { ReactComponent as PeopleLogo } from "../assets/people.svg";
import { ReactComponent as NewPersonLogo } from "../assets/new-person.svg";
import { ReactComponent as SavedLogo } from "../assets/new-person.svg";

function ProfilePage() {
  const nav = useNavigate();
  const [user, setUser] = useState("");
  const [selection, setSelection] = useState("");

  useEffect(() => {
    fetch("http://timesync.one/getCurrentUser", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setUser(data.user));
  }, []);

  const handleLogOut = (e) => {
    fetch("http://timesync.one/logout", {
      method: "POST",
      credentials: "include",
    }).then(nav("/login"));
  };

  const handleSwitch = (e) => {
    setSelection(e.target.text);
  };

  const renderSelection = () => {
    switch (selection.trim()) {
      case "Settings":
        return <Settings username={user} />;
      case "Friends":
        return <Friends username={user} />;
      case "Friend Requests":
        return <FriendRequests />;
      case "Saved Syncs":
        return <SavedSyncs />;
      default:
        return "";
    }
  };

  return (
    <Container fluid>
      <br />
      <Row className="bg-dark">
        <Col xs={10}>
          <h1 className="text-light mt-2 mb-2">@{user}</h1>
        </Col>
        <Col xs={2}>
          <Button className="mt-2 mb-2" onClick={handleLogOut}>
            Log Out{" "}
            <span>
              <LogOutLogo style={{ width: "16px", fill: "white" }} />
            </span>
          </Button>
        </Col>
      </Row>
      <br />
      <Row>
        <Col className="col-3">
          <Nav variant="tabs" className="flex-column text-dark">
            <Nav.Link className="text-dark" onClick={handleSwitch}>
              <span>
                <CogLogo style={{ width: "25px", fill: "black" }} />
              </span>{" "}
              Settings
            </Nav.Link>
            <Nav.Link className="text-dark" onClick={handleSwitch}>
              <span>
                <PeopleLogo style={{ width: "25px", fill: "black" }} />
              </span>{" "}
              Friends
            </Nav.Link>
            <Nav.Link className="text-dark" onClick={handleSwitch}>
              <span>
                <NewPersonLogo style={{ width: "25px", fill: "black" }} />
              </span>{" "}
              Friend Requests
            </Nav.Link>
            <Nav.Link className="text-dark" onClick={handleSwitch}>
              <span>
                <SavedLogo style={{ width: "25px", fill: "black" }} />
              </span>{" "}
              Saved Syncs
            </Nav.Link>
          </Nav>
        </Col>
        <Col xs={8}>{renderSelection()}</Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
