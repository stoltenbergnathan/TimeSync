import React from "react";

function Navbar() {
  return (
    <div className="navbar">
      <nav className="navbar navbar-expand">
        <div className="container">
          <Navbar className="navbar-header" to="/">
            TimeSync
          </Navbar>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Navbar className="nav-piece" to="/">
                  Feed
                  <span className="sr-only">(current)</span>
                </Navbar>
              </li>
              <li className="nav-item">
                <Navbar className="nav-piece" to="/events">
                  Find Events
                </Navbar>
              </li>
              <li className="nav-item">
                <Navbar className="nav-piece" to="/activities">
                  Get Activites
                </Navbar>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
