import { addError } from "../actions/toast.action";
const initialState = [];
const calendarAttendance = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ATTENDANCE_CALENDAR_SUCCESS": {
      return action.payload.data;
    }
    case "FETCH_ATTENDANCE_CALENDAR_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }

    case "REMOVE_CALENDAR_DATA":
    case "LOGOUT": {
      return [];
    }

    default: {
      return state;
    }
  }
};

export default calendarAttendance;
