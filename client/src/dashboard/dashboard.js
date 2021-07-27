import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../actions/profile";
import Spinner from "../component/Layout/spinner";
import { Link } from "react-router-dom";
import DashboardActions from "./dashboardActions";
import Experience from "./experience";
import Education from "./education";

const Dashboard = ({
  auth: { user },
  profile: { profile, loading },
  getCurrentProfile,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">Welcome {user.name}</p>
      {profile !== null ? (
        <>
          <DashboardActions />
          {/* <Experience experience={profile.experience} />
          <Education education={profile.education} /> */}
        </>
      ) : (
        <>
          <p>You have not yet setup a profile add some info </p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create profile
          </Link>
        </>
      )}
    </>
  );
};
const mapStatesToProps = (state) => {
  return {
    auth: state.auth,
    profile: state.profile,
  };
};
export default connect(mapStatesToProps, { getCurrentProfile })(Dashboard);
