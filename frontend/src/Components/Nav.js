import { React, useState } from "react";
import { NavDropdown, Modal, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Time } from "../assets/time.svg";
import { ReactComponent as ChatLogo } from "../assets/chat.svg";
import { ReactComponent as AddLogo } from "../assets/add.svg";
import { ReactComponent as UserLogo } from "../assets/user.svg";

function Nav() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  let nav = useNavigate();

  const handlePost = (e, visable) => {
    setShow(false);
    nav("/");
    fetch("http://timesync.one/PostActivity", {
      method: "POST",
      body: JSON.stringify({
        title: document.querySelector("#postText").value,
        kind: "Post",
        visability: visable,
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    setShow(false);
    window.location.reload();
  };

  const handleShow = () => setShow(true);

  return (
    <div className="navbar p-0">
      <nav className="navbar navbar-expand nav-fill  w-100 navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <Time
              style={{
                fill: "lightblue",
                width: "40px",
                marginRight: "10px",
              }}
              alt="spinning clock"
            />
            TimeSync
          </Link>
          <div>
            <ul className="navbar-nav ml-auto">
              <li>
                <Link to="#" className="nav-link" onClick={handleShow}>
                  <span>
                    <AddLogo style={{ width: "16px", fill: "lightgrey" }} />
                  </span>{" "}
                  New Post
                </Link>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>New Post</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form.Control id="postText" as="textarea" rows={3} />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="dark" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      onClick={(e) => {
                        handlePost(e, "Public");
                      }}
                    >
                      Post to Public
                    </Button>
                    <Button
                      variant="primary"
                      onClick={(e) => {
                        handlePost(e, "Private");
                      }}
                    >
                      Post to Friends
                    </Button>
                  </Modal.Footer>
                </Modal>
              </li>
              <li>
                <NavDropdown title="Spend Time" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/events">
                    <Link className="nav-link text-dark" to="/events">
                      Find Events
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/activities">
                    <Link className="nav-link text-dark" to="/activities">
                      Get Activities
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/messages">
                  <span>
                    <ChatLogo style={{ width: "16px", fill: "lightgrey" }} />
                  </span>{" "}
                  Messages
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  <span>
                    <UserLogo style={{ width: "30px", fill: "lightgrey" }} />
                  </span>{" "}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
