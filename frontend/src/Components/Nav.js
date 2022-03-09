import React from "react";
import logo from "../assets/clocks.gif";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

function Nav() {
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
