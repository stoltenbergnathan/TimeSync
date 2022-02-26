import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <nav className="navbar navbar-expand">
        <div className="container">
          <NavLink className="navbar-header" to="/">
            TimeSync
          </NavLink>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-piece" to="/">
                  Feed
                  <span className="span">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-piece" to="/events">
                  Find Events
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-piece" to="/activities">
                  Get Activites
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
