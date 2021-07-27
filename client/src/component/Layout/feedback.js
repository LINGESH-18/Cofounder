import React, { useRef } from "react";
import { connect } from "react-redux";
import UserFeedback from "../../actions/feedback";
import { setAlert } from "../../actions/alert";
function Feedback({ UserFeedback }) {
  var userFeedback = useRef("");
  function submithandler(e) {
    e.preventDefault();
    console.log({ userFeedback: userFeedback.current.value });
    UserFeedback({ userFeedback: userFeedback.current.value });
    setAlert("Feedback submitted", "sucess");
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
          <input
            type="text"
            placeholder="Feedback"
            name="userFeedback"
            ref={userFeedback}
          />
          <small className="form-text">Feedback pls</small>
        </div>
        <div className="form-group"></div>
        <input
          type="submit"
          className="btn btn-primary"
          value="Submit feedback"
        />
      </form>
    </div>
  );
}

const mapStatereportProps = (state) => {
  return { isAuthenticated: state.auth.isAuthenticated };
};
export default connect(mapStatereportProps, { UserFeedback })(Feedback);
