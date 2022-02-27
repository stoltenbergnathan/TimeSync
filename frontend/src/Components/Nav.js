import React from "react";
import logo from "../assets/clock.gif";
import { Container, NavDropdown } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
function Nav() {
  return (
    <div className="navbar">
      <Navbar
        fixed="top"
        style={{ position: "sticky" }}
        className="navbar navbar-expand nav-fill  w-100  navbar-primary bg-dark fw-bold"
      >
        <Container>
          <a className="navbar-brand fs-5" href="/">
            <img
              src={logo}
              style={{ "max-width": "6%", "margin-right": "5px" }}
              alt="spinning clock"
            />
            TimeSync
          </a>
          <div>
            <ul className="navbar-nav ml-auto">
              <li>
                <NavDropdown
                  title={
                    <span className="text-primary my-auto">Spend Time</span>
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item className="text-success" href="/events">
                    Find Events
                  </NavDropdown.Item>
                  <NavDropdown.Item className="text-primary" href="/activities">
                    Get Activities
                  </NavDropdown.Item>
                </NavDropdown>
              </li>
              <li className="nav-item">
                <a className="nav-link text-primary" href="/messages">
                  Messages
                </a>
              </li>
            </ul>
          </div>
        </Container>
      </Navbar>
    </div>
  );
}

export default Nav;
