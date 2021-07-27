import React, { useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";
import { register } from "../actions/auth";

function Registration({ setAlert, register, isAuthenticated }) {
  var name = useRef("");
  var email = useRef("");
  var password = useRef("");
  var password2 = useRef("");

  const formSubmit = async (e) => {
    e.preventDefault();
    if (password.current.value !== password2.current.value) {
      setAlert("Password do not match", "danger");
    }
    register({
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
    });
  };
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div textalign="center">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit={formSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" ref={name} />
        </div>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            ref={password2}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
}
const mapStatetoProps = (state) => {
  return { isAuthenticated: state.auth.isAuthenticated };
};

export default connect(mapStatetoProps, { setAlert, register })(Registration);
