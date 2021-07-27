import React, { useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Reportuser from "../../actions/report";
import { setAlert } from "../../actions/alert";
function Report({ Reportuser, isAuthenticated }) {
  var to = useRef("");
  var report = useRef("");

  function submithandler(e) {
    e.preventDefault();
    console.log({ to: to.current.value, report: report.current.value });
    Reportuser({ to: to.current.value, report: report.current.value });
    setAlert("report submitted", "sucess");
  }

  return (
    <div textalign="center">
      <h1 className="large text-primary">REPORT</h1>
      <p className="lead">
        <i className="fas fa-user" />
        The report page
      </p>
      <form className="form" onSubmit={submithandler}>
        <div className="form-group"></div>
        <div className="form-group">
          <input type="text" placeholder="person name" name="to" ref={to} />
          <small className="form-text">
            Add the person name to be reported
          </small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="report" name="report" ref={report} />
        </div>
        <div className="form-group"></div>
        <input type="submit" className="btn btn-primary" value="Report" />
      </form>
    </div>
  );
}

const mapStatereportProps = (state) => {
  return { isAuthenticated: state.auth.isAuthenticated };
};
export default connect(mapStatereportProps, { Reportuser })(Report);
