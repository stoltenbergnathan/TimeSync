import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { Carousel } from "react-bootstrap";

function LoginPage() {
  const nav = useNavigate();

  useEffect(() => {
    fetch("https://timesync.one/isAuth", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        if (data.auth) nav("/");
      });
  }, [nav]);

  return (
    <div className="container-fluid h-100 row">
      <Carousel variant="dark" interval={null} indicators={false}>
        <Carousel.Item>
          <Login />
        </Carousel.Item>
        <Carousel.Item>
          <Register />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default LoginPage;
