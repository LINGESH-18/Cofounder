import { config } from "./types";
import axios from "axios";
const UserFeedback =
  ({ userFeedback }) =>
  async (dispatch) => {
    const body = JSON.stringify({ userFeedback });
    console.log(body);
    try {
      const res = await axios.post("/api/feedback", body, config);
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

export default UserFeedback;
