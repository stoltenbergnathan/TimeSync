import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const nav = useNavigate();
  return (
    <div className="col-6 m-auto">
      <br></br>
      <h2 className="text-center">Login</h2>
      <form
        action=""
        method="post"
        className="border p-3"
        onSubmit={() => {
          nav("/");
        }}
      >
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
          />
          <small id="emailHelp" className="form-text text-muted">
            Email used for registration.
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
            required
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
