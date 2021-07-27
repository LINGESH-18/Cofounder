import {
  REGISTER_SUCCESS,
  REGISTER_FAILUARE,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN_FAILUARE,
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  token: localStorage.getItem("clientToken"),
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return { ...state, isAuthenticated: true, loading: false, user: payload };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("clientToken", payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_FAILUARE:
    case AUTH_ERROR:
    case LOGIN_FAILUARE:
    case LOGOUT:
      localStorage.removeItem("clientToken");
      return { ...state, loading: false, isAuthenticated: false };

    default:
      return state;
  }
}
