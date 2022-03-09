import { React, useState } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LoginLogo } from "../assets/log-in.svg";

function Login() {
  const nav = useNavigate();
  const [loginAttempt, updateLoginAttempt] = useState(false);
  const [logForm, updateLogForm] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost/login", {
      method: "POST",
      body: JSON.stringify({
        username: logForm.username,
        password: logForm.password,
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then((data) => {
      if (data.status === 200) nav("/");
      else {
        console.log(data);
        updateLoginAttempt(true);
      }
    });
  };

  return (
    <div className="col-6 m-auto">
      <br></br>
      <h2 className="text-center">Login</h2>
      <form method="post" className="border p-3" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Username</label>
          <input
            type="username"
            name="username"
            className="form-control"
            id="username"
            aria-describedby="usernameHelp"
            placeholder="Enter username"
            required={true}
            value={logForm.username}
            onChange={(e) =>
              updateLogForm({ ...logForm, username: e.target.value })
            }
          />
          <small id="usernameHelp" className="form-text text-muted">
            Username used for registration.
          </small>
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={logForm.password}
            onChange={(e) =>
              updateLogForm({ ...logForm, password: e.target.value })
            }
          />
        </div>
        <br></br>
        <div className="form-check">
          <input
            type="checkbox"
            name="checkbox"
            className="form-check-input"
            id="remember"
          />
          <label className="form-check-label" htmlFor="remember">
            Remember me
          </label>
        </div>
        <br></br>
        <button type="submit" className="btn btn-primary float-right">
          Login{" "}
          <span>
            <LoginLogo style={{ fill: "white", width: "20px" }} />
          </span>
        </button>
        <p></p>
        {loginAttempt ? (
          <Alert variant="danger text-center">Invalid Login</Alert>
        ) : (
          <></>
        )}
      </form>
      <br />
    </div>
  );
}

export default Login;
