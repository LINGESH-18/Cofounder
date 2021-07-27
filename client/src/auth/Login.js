import React, { useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import { login } from "../actions/auth";
import { connect } from "react-redux";
function Login({ login, isAuthenticated }) {
  var email = useRef("");
  var password = useRef("");

  function submithandler(e) {
    e.preventDefault();
    login({ email: email.current.value, password: password.current.value });
  }
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div textalign="center">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" />
        Sign into Your Account
      </p>
      <form className="form" onSubmit={submithandler}>
        <div className="form-group"></div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            ref={email}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            ref={password}
          />
        </div>
        <div className="form-group"></div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Dont have an account? <Link to="/register">Sign In</Link>
      </p>
    </div>
  );
}
const mapStatetoProps = (state) => {
  return { isAuthenticated: state.auth.isAuthenticated };
};
export default connect(mapStatetoProps, { login })(Login);
