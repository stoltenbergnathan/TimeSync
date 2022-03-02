import { React, useEffect } from "react";
import { Outlet, Route, useNavigate } from "react-router-dom";

function AuthRoute({ path, element }) {
  const nav = useNavigate();
  useEffect(() => {
    fetch("http://localhost/isAuth", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        if (!data.auth) {
          nav("/login");
        }
      });
  }, []);

  return <Outlet />;
}

export default AuthRoute;
