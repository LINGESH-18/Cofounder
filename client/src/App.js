import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./component/Layout/navbar";
import Landing from "./component/Layout/landing";
import { Route, Switch } from "react-router-dom";
import Login from "./auth/Login";
import Registration from "./auth/Registration";
import Alert from "./component/Layout/alert";
import { loadUser } from "./actions/auth";
import store from "./store/store";
import Dashboard from "./dashboard/dashboard";
import Privateroute from "./Routing/Privateroute";
import CreateProfile from "./component/profile-form.js/CreateProfile";
import EditProfile from "./component/profile-form.js/EditProfile";
import AddExpereince from "./component/profile-form.js/AddExpereince";
import AddEducation from "./component/profile-form.js/AddEducation";
import Report from "./component/Layout/report";
import Feedback from "./component/Layout/feedback";
import Authlogin from "./component/Layout/Authlogin";
import AuthDashboard from "./component/Layout/AuthDashboard";

function App() {
  useEffect(() => {
    if (localStorage.clientToken) {
      store.dispatch(loadUser());
    }
  }, []);
  return (
    <React.Fragment>
      <Navbar />
      <Route path="/" component={Landing} exact />
      <section className="container">
        <Alert></Alert>
        <Switch>
          <Route path="/register" component={Registration} exact />
          <Route path="/login" component={Login} exact />
          <Privateroute path="/dashboard" component={Dashboard} />
          <Privateroute path="/create-profile" component={CreateProfile} />
          <Privateroute path="/edit-profile" component={EditProfile} />
          <Privateroute path="/add-experience" component={AddExpereince} />
          <Privateroute path="/add-education" component={AddEducation} />
          <Route path="/report" component={Report} />
          <Route path="/feedback" component={Feedback} />
          <Route path="/authlogin" component={Authlogin} />
          <Route path="/Authdashboard" component={AuthDashboard} />
        </Switch>
      </section>
    </React.Fragment>
  );
}
export default App;
