import React from "react";
import logo from "../assets/clocks.gif";
import { NavDropdown } from "react-bootstrap";

function Nav() {
  return (
    <div className="navbar p-0">
      <nav className="navbar navbar-expand nav-fill  w-100 navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img
              src={logo}
              style={{
                "max-width": "8%",
                "margin-right": "5px",
              }}
              alt="spinning clock"
            />
            TimeSync
          </a>
          <div>
            <ul className="navbar-nav ml-auto">
              <li>
                <NavDropdown title="Spend Time" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/events">
                    Find Events
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/activities">
                    Get Activities
                  </NavDropdown.Item>
                </NavDropdown>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/messages">
                  Messages
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Profile
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
