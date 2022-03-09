import { React, useState } from "react";
import logo from "../assets/clocks.gif";
import { NavDropdown, Modal, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  let nav = useNavigate();

  const handlePost = (e, visable) => {
    setShow(false);
    nav("/");
    fetch("http://timesync/PostActivity", {
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
  };

  const handleShow = () => setShow(true);

  return (
    <div className="navbar p-0">
      <nav className="navbar navbar-expand nav-fill  w-100 navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src={logo}
              style={{
                width: "50px",
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
                    <Button variant="secondary" onClick={handleClose}>
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
                      href="/"
                      variant="success"
                      onClick={(e) => {
                        handlePost(e, "Friends");
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
                  Messages
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
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
