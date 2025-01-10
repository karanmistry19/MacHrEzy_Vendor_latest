import { addError } from "../actions/toast.action";
const initialState = [];
const teamAttendanceSummary = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TEAM_ATTENDANCE_SUMMARY_SUCCESS": {
      return action.payload.data;
    }
    case "FETCH_TEAM_ATTENDANCE_SUMMARY_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }

    case "LOGOUT": {
      return [];
    }

    default: {
      return state;
    }
  }
};

export default teamAttendanceSummary;
