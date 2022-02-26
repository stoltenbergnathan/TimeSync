import React from "react";
import Login from "./Login";
import Register from "./Register";
import { Carousel } from "react-bootstrap";

function LoginPage() {
  return (
    <div className="container-fluid h-100 row">
      <Carousel variant="dark" interval={null}>
        <Carousel.Item>
          <Login></Login>
        </Carousel.Item>
        <Carousel.Item>
          <Register></Register>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default LoginPage;
