import { React, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function AuthRoute() {
  const nav = useNavigate();
  const [loaded, setLoad] = useState(false);

  useEffect(() => {
    fetch("http://localhost/isAuth", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        if (data.auth === false) {
          nav("/login");
        } else setLoad(true);
      })
      .catch((err) => {
        console.log(err);
        nav("/login");
      });
  }, [nav]);

  if (loaded) return <Outlet />;
  else return <></>;
}

export default AuthRoute;
