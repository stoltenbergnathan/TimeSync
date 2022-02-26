import React from "react";
import { Button } from "react-bootstrap";

function Homepage() {
  return (
    <div>
      <div className=" d-flex justify-content-center">
        <Button variant="primary  w-25 m-1" size="lg">
          Area Feed
        </Button>
        <Button variant="success w-25 m-1" size="lg">
          Personal Feed
        </Button>
      </div>
      <div className="container d-flex justify-content-center w-75 border h-100">
        <h1>Feed goes here</h1>
      </div>
    </div>
  );
}

export default Homepage;
