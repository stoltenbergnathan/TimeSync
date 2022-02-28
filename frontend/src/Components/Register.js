import React from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const nav = useNavigate();
  return (
    <div className="col-6 m-auto">
      <br></br>
      <h2 className="text-center">Register</h2>
      <form
        className="border p-3"
        action=""
        method="post"
        onSubmit={() => {
          nav("/");
        }}
      >
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="username"
            name="username"
            className="form-control"
            id="username"
            aria-describedby="usernameHelp"
            placeholder="Enter Username"
            required="true"
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
            required="true"
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
            required="true"
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
            required="true"
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
            I accept terms and conditions
          </label>
        </div>
        <br></br>
        <button type="submit" className="btn btn-primary float-right">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
