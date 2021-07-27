import React, { useRef, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Authlogin from "../../actions/AuthLogin";

function AuthLogin({ Authlogin, result }) {
  var name = useRef("");
  var password = useRef("");
  const [redirect, setRedirect] = useState(false);

  function submithandler(e) {
    e.preventDefault();
    Authlogin({ name: name.current.value, password: password.current.value });
    setRedirect(true);
  }

  if (redirect) {
    return <Redirect to="/Authdashboard" />;
  }

  return (
    <>
      {" "}
      <div textalign="center">
        <h1 className="large text-primary">Admin Login</h1>
        <p className="lead">
          <i className="fas fa-user" /> Login into Admin account
        </p>
        <form className="form" onSubmit={submithandler}>
          <div className="form-group"></div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Admin name"
              name="name"
              ref={name}
            />
            <small className="form-text">Please enter Admin Name</small>
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
          <input type="submit" className="btn btn-primary" value="submit" />
        </form>
      </div>
    </>
  );
}

const mapStatesToProps = (state) => {
  return { result: state.AuthLogin.result };
};

export default connect(mapStatesToProps, { Authlogin })(AuthLogin);
