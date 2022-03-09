import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LoginLogo } from "../assets/log-in.svg";
import { Alert } from "react-bootstrap";

function Register() {
  const [registerAttempt, updateRegisterAttempt] = useState(false);
  const [regForm, updateRegForm] = useState({
    username: "",
    password: "",
    passwordCheck: "",
    email: "",
    agreed: false,
  });
  const nav = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (regForm.password !== regForm.passwordCheck) {
      updateRegisterAttempt(true);
      // Respond to user saying bad
    } else if (regForm.agreed === false) {
      updateRegisterAttempt(true);
      // Respond to user saying bad
    } else {
      fetch("http://localhost/register", {
        method: "POST",
        body: JSON.stringify({
          username: regForm.username,
          password: regForm.password,
          email: regForm.email,
        }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data["message"] && data["message"] === "success") nav("/");
          else {
            console.log(data);
          }
        });
    }
  };

  return (
    <div className="col-6 m-auto">
      <br></br>
      <h2 className="text-center">Register</h2>
      <form className="border p-3" method="post" onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="username"
            name="username"
            className="form-control"
            id="username"
            aria-describedby="usernameHelp"
            placeholder="Enter Username"
            required={true}
            value={regForm.username}
            onChange={(e) =>
              updateRegForm({ ...regForm, username: e.target.value })
            }
          />
          <small id="usernameHelp" className="form-text text-muted">
            Username must be unique.
          </small>
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required={true}
            value={regForm.email}
            onChange={(e) =>
              updateRegForm({ ...regForm, email: e.target.value })
            }
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
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
            required={true}
            value={regForm.password}
            onChange={(e) =>
              updateRegForm({ ...regForm, password: e.target.value })
            }
          />
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="confirmpassword">Password</label>
          <input
            type="password"
            name="password2"
            className="form-control"
            id="confirmpassword"
            placeholder="Password Again"
            required={true}
            value={regForm.passwordCheck}
            onChange={(e) =>
              updateRegForm({ ...regForm, passwordCheck: e.target.value })
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
            checked={regForm.agreed}
            onChange={() =>
              updateRegForm({ ...regForm, agreed: !regForm.agreed })
            }
          />
          <label className="form-check-label" htmlFor="remember">
            I accept terms and conditions
          </label>
        </div>
        <br></br>
        <button type="submit" className="btn btn-primary float-right">
          Register{" "}
          <span>
            <LoginLogo style={{ fill: "white", width: "20px" }} />
          </span>
        </button>
        <p></p>
        {registerAttempt ? (
          <Alert variant="danger text-center">
            Make sure passwords match, and you agree to the terms
          </Alert>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
}

export default Register;
