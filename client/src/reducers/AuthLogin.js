import { GET_DASHBOARD_DETAIL } from "../actions/types";

const initialState = {
  result: null,
  loading: true,
  total_cofounders_count: null,
  total_user_count: null,
  Total_Feedback_count: null,
  Total_Report_count: null,
  Feedbacks: [],
  Reports: [],
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_DASHBOARD_DETAIL:
      console.log({
        ...state,
        result: payload,
        loading: false,
        total_cofounders_count: payload.total_cofounders_count,
        total_user_count: payload.total_user_count,
        Total_Feedback_count: payload.Total_Feedback_count,
        Total_Report_count: payload.Total_Report_count,
        Feedbacks: payload.Feedbacks,
        Reports: payload.Reports,
      });
      return {
        ...state,
        result: true,
        loading: false,
        total_cofounders_count: payload.total_cofounders_count,
        total_user_count: payload.total_user_count,
        Total_Feedback_count: payload.Total_Feedback_count,
        Total_Report_count: payload.Total_Report_count,
        Feedbacks: payload.Feedbacks,
        Reports: payload.Reports,
      };
    default:
      return state;
  }
}
