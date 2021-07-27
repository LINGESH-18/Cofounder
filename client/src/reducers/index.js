import alert from "./alert";
import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./profile";
import AuthLogin from "./AuthLogin";
export default combineReducers({
  alert: alert,
  auth: auth,
  profile: profile,
  AuthLogin: AuthLogin,
});
