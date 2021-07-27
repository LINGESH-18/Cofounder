import React from "react";
import { connect } from "react-redux";
import Spinner from "../Layout/spinner";
const AuthDashboard = ({ data }) => {
  console.log({ data });
  const {
    loading,
    total_cofounders_count,
    total_user_count,
    Total_Feedback_count,
    Total_Report_count,
    Feedbacks,
    Reports,
  } = data;
  console.log("Loading", loading);

  var show;
  show =
    loading === true ? (
      <Spinner />
    ) : (
      <>
        <h2>total_cofounders_count:{total_cofounders_count}</h2>
        <h2>total_user_count:{total_user_count}</h2>
        <h2>Total_Feedback_count:{Total_Feedback_count}</h2>
        <h2>Total_Report_count:{Total_Report_count}</h2>
        <h1>
          Feedbacks:
          {Feedbacks.map((fed) => {
            return <h4>{fed}</h4>;
          })}
        </h1>
        <h1>
          Reports:{" "}
          {Reports.map((fed) => {
            return <h4>{fed}</h4>;
          })}
        </h1>
      </>
    );

  return show;
};

const mapStatesToProps = (state) => {
  return { data: state.AuthLogin };
};

export default connect(mapStatesToProps)(AuthDashboard);
