import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const nav = useNavigate();
  const [logForm, updateLogForm] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://timesync.one/login", {
      method: "POST",
      body: JSON.stringify({
        username: logForm.username,
        password: logForm.password,
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then((data) => {
      if (data.status === 200) nav("/");
      else console.log(data);
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
          Login
        </button>
      </form>
      <br></br>
    </div>
  );
}

export default Login;
