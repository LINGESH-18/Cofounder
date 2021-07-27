import React from "react";
import { connect } from "react-redux";
const Alert = ({ alerts }) => {
  return alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));
};
const mapstatestoprop = (state) => {
  return { alerts: state.alert };
};
export default connect(mapstatestoprop)(Alert);
