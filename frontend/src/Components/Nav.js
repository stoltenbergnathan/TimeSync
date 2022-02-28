import React from "react";
import logo from "../assets/clock.gif";
import { NavDropdown, Navbar } from "react-bootstrap";

function Nav() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#">
          <img
            width="30"
            height="30"
            src={logo}
            alt="spinning clock"
            className="d-inline-block align-top"
          />
          TimeSync
        </Navbar.Brand>
        <Nav className="me-auto">
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#events">Find Events</NavDropdown.Item>
            <NavDropdown.Item href="#activities">
              Get Activities
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#messages">Messages</Nav.Link>
          <Nav.Link href="#login">Profile</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default Nav;
