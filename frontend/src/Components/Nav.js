import React from "react";
import logo from "../assets/clock.gif";
import { Container, NavDropdown, Navbar } from "react-bootstrap";

function Nav() {
  return (
    <div className="navbar p-0">
      <Navbar className="navbar navbar-expand nav-fill  w-100 navbar-dark bg-dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo}
              style={{ "max-width": "6%", "margin-right": "5px" }}
              alt="spinning clock"
            />
            TimeSync
          </Navbar.Brand>
          <Navbar.Collapse>
            <Nav className="navbar-nav ml-auto">
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="/events">Find Events</NavDropdown.Item>
                <NavDropdown.Item href="/activities">
                  Get Activities
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/messages">Messages</Nav.Link>
              <Nav.Link href="/login">Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Nav;
