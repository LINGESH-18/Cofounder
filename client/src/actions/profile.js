import { GET_PROFILE, PROFILE_ERROR, config, UPDATE_PROFILE } from "./types";
import { setAlert } from "./alert";
import axios from "axios";
//getting user current profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profiles/me");
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//create or updating profile
export const createProfile =
  (formdata, history, edit = false) =>
  async (dispatch) => {
    try {
      const res = await axios.post("/api/profiles", formdata, config);
      console.log(res.data);
      dispatch({ type: GET_PROFILE, payload: res.data });
      dispatch(
        setAlert(edit ? "Profile update" : "Profile created", "success")
      );
      if (!edit) {
        console.log("Pushing");
        history.push("/dashboard");
      }
    } catch (err) {
      console.log(err);
      console.log(err.message);

      if (formdata.skills === "") {
        dispatch(setAlert("Skills is required", "danger"));
      }
      if (formdata.status === "") {
        dispatch(setAlert("Status is required", "danger"));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

export const addExpereince = (formdata, history) => async (dispatch) => {
  try {
    const res = await axios.put("/api/profiles/expereince", formdata, config);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert("Expereience added", "success"));
    history.push("/dashboard");
  } catch (err) {
    console.log(err.message);

    if (formdata.company === "") {
      dispatch(setAlert("company is required", "danger"));
    }
    if (formdata.tittle === "") {
      dispatch(setAlert("tittle is required", "danger"));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.put("/api/profiles/education", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    console.log("from education", res.data.education);
    dispatch(setAlert("Education Added", "success"));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    if (formData.school === "") {
      dispatch(setAlert("school is required", "danger"));
    }
    if (formData.degree === "") {
      dispatch(setAlert("degree is required", "danger"));
    }
    if (formData.fieldofstudy === "") {
      dispatch(setAlert("fieldofstudy is required", "danger"));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// export const addEducation = (formdata, history) => async (dispatch) => {
//   try {
//     console.log(formdata);
//     console.log("towards the add educatio");
//     const res = await axios.put("/api/profiles/education", formdata, config);
//     console.log(res.data);
//     dispatch({ type: UPDATE_PROFILE, payload: res.data });
//     dispatch(setAlert("Education added", "success"));
//     history.push("/dashboard");
//   } catch (err) {
//     console.log(err.message);

//     if (formdata.school === "") {
//       dispatch(setAlert("school is required", "danger"));
//     }
//     if (formdata.degree === "") {
//       dispatch(setAlert("degree is required", "danger"));
//     }
//     if (formdata.fieldofstudy === "") {
//       dispatch(setAlert("fieldofstudy is required", "danger"));
//     }
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };
