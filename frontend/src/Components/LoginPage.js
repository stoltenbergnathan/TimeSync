import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { Carousel } from "react-bootstrap";

function LoginPage() {
  // const nav = useNavigate();

  useEffect(() => {
    fetch("http://localhost/isAuth", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.auth) console.log("CAN BE SKIPPED");
        else console.log("NOT LOGGED IN");
      });
  }, []);

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
