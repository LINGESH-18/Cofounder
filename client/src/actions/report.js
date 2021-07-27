import { config } from "./types";
import axios from "axios";
const Reportuser =
  ({ to, report }) =>
  async (dispatch) => {
    const body = JSON.stringify({ to, report });
    console.log(body);
    try {
      const res = await axios.post("/api/report", body, config);
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

export default Reportuser;
