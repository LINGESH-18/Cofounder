import axios from "axios";
import React from "react";
import { config, GET_DASHBOARD_DETAIL } from "./types";

const Authlogin =
  ({ name, password }) =>
  async (dispatch) => {
    const body = { name, password };
    console.log(body);
    try {
      const res = await axios.post("/api/dashboard", body, config);
      console.log(res.data);
      dispatch({ type: GET_DASHBOARD_DETAIL, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

export default Authlogin;
