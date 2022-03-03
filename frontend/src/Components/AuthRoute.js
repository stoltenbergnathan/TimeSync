import { React, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function AuthRoute() {
  const nav = useNavigate();
  useEffect(() => {
    fetch("http://localhost/isAuth", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        if (data.auth === false) {
          nav("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        nav("/login");
      });
  }, []);

  return <Outlet />;
}

export default AuthRoute;
