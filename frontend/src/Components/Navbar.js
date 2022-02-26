import React from "react";


function Navbar() {
  return (
    <div className="navbar">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-header" href="/">
            TimeSync
          </a>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Feed
                  <span className="sr-only">(Feed)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/events">
                  Find Events
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/activities">
                  Get Activites
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
